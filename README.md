# ReviewAI

ReviewAI classifies customer reviews as positive or negative. I trained three deep learning models from scratch on Yelp reviews (a vanilla RNN, an LSTM and a small Transformer), compared them on a held-out test set, and deployed the best one behind a FastAPI service with a React dashboard on top.

You can analyze a single review, or upload a CSV with hundreds of reviews, see the results on a dashboard, and download the labeled file.

## What the app does

- **Quick Review:** type a review and get the sentiment and the probability of it being positive.
- **Batch Upload:** upload a CSV with one column named `Review` (max 4 MB). Every review gets a sentiment and a probability.
- **Dashboard:** total reviews, positive, negative and uncertain counts, positive rate, average confidence, a sentiment pie chart and a confidence distribution chart.
- **Predictions:** a table of every review with search, filter and a CSV download of the labeled results.
- **Models:** the comparison of the three models.

Results are kept in the browser's local storage, so they are still there after a refresh.

## The data

I used the Hugging Face dataset `Yelp/yelp_review_full`. Ratings are 0 to 4. I sampled 100k training reviews and 10k test reviews (my internet is slow, so I sampled in Colab and downloaded the CSVs).

- Ratings 0 and 1 became negative (0), ratings 3 and 4 became positive (1), and the neutral middle rating was dropped.
- After that, the classes are close to 50/50, so accuracy is a fair metric. I report F1 as well.
- Train split: 63,871 reviews. Validation split: 15,968 (stratified 80/20, random_state 42). Test set: 8,006 reviews, untouched until the final evaluation.
- Text cleaning: lowercase, replace everything except letters, digits and spaces with a space, split on whitespace.
- Vocabulary: top 20,000 words from the training set only, plus `<pad>` and `<unk>`, 20,002 entries in total.
- Every review is padded or cut to 256 tokens.

## The models

All three models use the same inputs, the same 8 dimensional embedding, the same optimizer (Adam), the same loss (binary cross entropy) and the same early stopping (monitor val_loss, patience 2, restore best weights). That keeps the comparison fair.

- **Vanilla RNN:** Embedding, one SimpleRNN layer with 16 units, sigmoid output.
- **LSTM:** Embedding, one LSTM layer with 16 units, sigmoid output.
- **Transformer:** Embedding, one multi head attention block (2 heads) with a residual connection and layer normalization, global average pooling, sigmoid output. It has no positional embedding, so it does not see word order.

Padding is masked in all three, so the models skip the padded positions.

## Results

Evaluated once on the 8,006 review test set.

| Model | Accuracy | Precision | Recall | F1 | Train time per epoch | Inference (8,006 reviews) |
|---|---|---|---|---|---|---|
| Vanilla RNN | 0.9044 | 0.9247 | 0.8788 | 0.9012 | 40s | 0.89s |
| LSTM | 0.9142 | 0.8992 | 0.9312 | 0.9149 | 64s | 1.40s |
| Transformer | 0.9141 | 0.8998 | 0.9302 | 0.9147 | 50s | 2.12s |

I deployed the LSTM. It ties with the Transformer on accuracy and F1, it is faster at inference, and it is about one point better than the RNN. Test numbers are close to the validation numbers, so the models were not tuned against the test set.

The Transformer is small and trained from scratch on about 64k reviews, so it does not beat the LSTM here. I expect a pretrained model like DistilBERT to do better, which is the next thing I want to try.

## API

The backend is FastAPI. It loads the saved LSTM and the vocabulary once at startup.

- `POST /predict` takes a CSV file with a `Review` column and returns one object per review:

```json
[{"Review": "Great food", "Sentiment": "Positive", "Probability": 0.94}]
```

- A second endpoint takes a single review as JSON and returns the same object for it.

`Probability` is the model's probability that the review is positive. Reviews with a probability between 0.35 and 0.65 are labeled `Uncertain`. The API rejects files that are not CSV, files with more than one column, and files without a `Review` column.

## Project structure

```
deep-learning/    data prep, notebooks, model training and evaluation
backend/          FastAPI service, saved LSTM model, vocabulary
frontend/         React and Tailwind web app
```

`backend/text_processing.py` is a copy of the preprocessing code in `deep-learning/src`. The backend is deployed on its own, so it needs its own copy. If you change the preprocessing, change both and retrain.

## Run it locally

Backend:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and expects the API on `http://localhost:8000`.

## Tech

Python, TensorFlow and Keras, scikit-learn, pandas, FastAPI, React, Tailwind CSS, Chart.js.

## Limitations

- Trained on Yelp reviews, so it does best on restaurant and service reviews. Product reviews with different vocabulary can come out less confident.
- Words outside the 20,000 word vocabulary become `<unk>`, so very rare words are lost.

## Author

Muhammad Ghulam Ali
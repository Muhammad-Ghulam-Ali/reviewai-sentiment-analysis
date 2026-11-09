// Quick Review API

const quickReview = async (review) => {
    try {
        const response = await fetch("http://localhost:8000/quick/predict", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(review)
        })
        const result = await response.json()

        if (!response.ok) {
            return {success: false, message:result.detail}
        }

        return {success: true, message: result}

    } catch {
        return {success: false, message: "Network failed."}
    }
}

export { quickReview }
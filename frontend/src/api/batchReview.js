// Batch Review

const batchPredict = async (file) => {
    try {
        if (file.size > 4 * 1024 * 1024 ) {
            return { success: false, message: "File must be under 4MB." }
          }

        const formData = new FormData()
        formData.append("file", file)
        const response = await fetch("http://localhost:8000/batch/predict", {
            method: "POST",
            body: formData
        })

        const result = await response.json()

        if (!response.ok) {
            return {success: false, message: result.detail}
        }

        return {success:true, message: result}

    } catch {
        return {success:false, message: "Network failed."}
    }
}

export { batchPredict }
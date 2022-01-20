export default function requestActions() {

    async function getAllPosts() {

        const response = await fetch("/api/user");
        if (!response.ok) {
            throw new Error("geting (all) posts failed.");
        }
        const data = await response.json();
        return data;
    }
    

    return {getAllPosts};
}



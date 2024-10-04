export default async function handler(req, res) {
    const response = await fetch('https://api.pinterest.com/v1/boards/liniker/arte/pins/');
    const data = await response.json();
    res.status(200).json(data);
}
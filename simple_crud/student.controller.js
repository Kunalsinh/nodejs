let data = [
    { id: 1, name: "ABC", email: "abc@gmail.com" },
    { id: 2, name: "DEF", email: "def@gmail.com" },
]

exports.index = (req, res) => {
    res.json(data);
}

exports.createUser = (req, res) => {
    const userData = {
        "id": data.length + 1,
        "name": req.body.name,
        "email": req.body.email,
    }
    data.push(userData)
}

exports.updateUser = (req, res) => {
    const uID = parseInt(req.params.id, 10)
    const user = data.find((u) => u.id === uID)
    if (!user) {
        return res.json({ message: 'Error !' });
    }
    user.name = req.body.name
    user.name = req.body.name
    res.json(data);
}

exports.deleteUser = (req, res) => {
    const uID = parseInt(req.params.id, 10)
    const userIndex = data.findIndex((u) => u.id === uID);
    if (userIndex === -1) {
        return res.json({ message: "Error!" });
    }
    data.splice(userIndex, 1);
    res.json({ message: "Delete!" })
}

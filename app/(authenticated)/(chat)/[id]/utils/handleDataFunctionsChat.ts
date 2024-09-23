const formatMessages = (messagesArray: any[], isUser: boolean) => {
    console.log(messagesArray, "array")
    return messagesArray.map((message: any) => ({
        _id: message.id,  // ID único da mensagem
        text: message.mensagem,  // Texto da mensagem
        createdAt: new Date(message.updated_at),  // Data de criação
        user: {
            _id: message.user_id,
            name: isUser ? "Você" : "Amigo",
            avatar: null
        },
    }));
};

export { formatMessages }
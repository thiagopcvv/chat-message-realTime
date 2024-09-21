const formatMessages = (messagesArray: any[], isUser: boolean) => {
    return messagesArray.map((message: any) => ({
        _id: message.id,  // ID único da mensagem
        text: message.texto,  // Texto da mensagem
        createdAt: new Date(message.data),  // Data de criação
        user: {
            _id: isUser ? 1 : 2,  // ID do usuário (diferente para user e friend)
            name: isUser ? "Você" : "Amigo",
            avatar: isUser
                ? "https://placeimg.com/140/140/people"
                : "https://placeimg.com/140/140/any",  // Avatar
        },
    }));
};

export { formatMessages }
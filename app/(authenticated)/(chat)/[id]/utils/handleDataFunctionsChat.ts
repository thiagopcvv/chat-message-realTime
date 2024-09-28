const formatMessages = (messagesArray: any[]) => {
    console.log(messagesArray, "uibfuyhs\vfiu")
    return messagesArray.map((message: any) => ({
        _id: message.id,  // ID único da mensagem
        text: message.mensagem,  // Texto da mensagem
        createdAt: message.created_at,  // Data de criação
        user: {
            _id: message.user_id,
            avatar: null
        },
    }));
};

export { formatMessages }
const functions = {
    listPost: {
        handler: "handler.listPost",
            events: [
            {
                httpApi: {
                    path: "/api/post",
                    method: "get",
                },
            },
        ],
    },
    readPost: {
        handler: "handler.readPost",
            events: [
            {
                httpApi: {
                    path: "/api/post/{title}",
                    method: "get",
                },
            },
        ],
    },
    createPost: {
        handler: "handler.createPost",
            events: [
            {
                httpApi: {
                    path: "/api/post",
                    method: "post",
                },
            },
        ],
    },
    updatePost: {
        handler: "handler.updatePost",
            events: [
            {
                httpApi: {
                    path: "/api/post/{title}",
                    method: "put",
                },
            },
        ],
    },
    deletePost: {
        handler: "handler.deletePost",
            events: [
            {
                httpApi: {
                    path: "/api/post/{title}",
                    method: "delete",
                },
            },
        ],
    },
}

export default functions;
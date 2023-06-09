// import * as AWS from "aws-sdk";
import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import * as storage from './storage';
import * as s from "./status";
import { Post } from "./model";
import { ResultStatus } from "./status";

export const createPost: APIGatewayProxyHandlerV2<ResultStatus> = async (event: APIGatewayProxyEventV2) => {
    if (!event.body) {
        return s.notFoundError();
    }

    const { title, content } = JSON.parse(event.body);


    if (!(await storage.insert({ title, content }))) {
        return s.notFoundError();
    }

    return s.dataSuccess({ title }, 201);
}

export const readPost: APIGatewayProxyHandlerV2<ResultStatus> = async (event: APIGatewayProxyEventV2) => {
    if (!event.pathParameters || !event.pathParameters['title']) {
        return s.notFoundError();
    }

    const post: Post | null = await storage.select(event.pathParameters.title);

    if (!(post)) {
        return s.notFoundError();
    }

    return s.dataSuccess(post, 200);
}

export const updatePost: APIGatewayProxyHandlerV2<ResultStatus> = async (event: APIGatewayProxyEventV2) => {
    if (!event.body || !event.pathParameters || !event.pathParameters['title']) {
        return s.notFoundError();
    }

    const oldTitle: string = event.pathParameters.title;

    const { title, content } = JSON.parse(event.body);

    if (!(await storage.update(oldTitle, { title, content }))) {
        return s.notFoundError();
    }

    return s.dataSuccess({ title }, 200);
}

export const listPost: APIGatewayProxyHandlerV2<ResultStatus> = async () => {
    const posts: Post[] = await storage.list();

    console.log('ctemp');

    // return s.dataSuccess({ posts });

    return s.dataSuccess({ posts });
}

export const deletePost: APIGatewayProxyHandlerV2<ResultStatus> = async (event: APIGatewayProxyEventV2) => {
    if (!event.pathParameters || !event.pathParameters['title']) {
        return s.notFoundError();
    }

    await storage.remove(event.pathParameters.title);

    return s.success(204);
}
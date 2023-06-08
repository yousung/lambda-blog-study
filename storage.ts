import { Post } from "./model";

export const remove = async (title: string): Promise<void> => {}


export const list = async (): Promise<Post[]> => {
    return [];
}


export const insert = async (post: Partial<Post>) : Promise<null|Post> => {

    return null;
}

export const select = async (title?: string) : Promise<null|Post> => {

    return null;
}

export const update = async (oldTitle: string, post: Partial<Post>) : Promise<null|Post> => {
    return null;
}
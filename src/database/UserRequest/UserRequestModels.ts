const DB_URL = import.meta.env.env_database_requests_url

interface TUserCreate {
    email: string
    phone: string
}

interface TUserRetrieve extends TUserCreate {
    id: string
}

type TResponseBody = {
    uuid: string
}

async function generateUUID(client: TUserCreate): Promise<TResponseBody> {
    const url = import.meta.env.env_server_url

    const body = {
        stream_code: import.meta.env.env_server_stream_code,
        client: { phone: client.phone, name: client.email },
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: import.meta.env.env_server_auth_token,
        },
        body: JSON.stringify(body),
    })

    if (!response.ok) throw new Error()

    const responseBody: Promise<TResponseBody> = response.json()

    return responseBody
}

async function initUserRequest({ email, phone }: TUserCreate) {
    const { uuid } = await generateUUID({ email, phone })
    return new UserRequest({ email, id: uuid, phone })
}

export class UserRequest implements TUserRetrieve {
    id: string
    email: string
    phone: string

    constructor({ email, id, phone }: TUserRetrieve) {
        this.id = id
        this.email = email
        this.phone = phone
    }

    static async get({
        email,
        phone,
    }: TUserCreate): Promise<undefined | UserRequest> {
        const url = `${DB_URL}?email=${email}&phone=${phone.replace('+', '%2B')}`

        const response = await fetch(url)
        const body: TUserRetrieve[] = await response.json()

        if (body.length !== 1) return undefined

        return body[0]
    }

    static async create({
        email,
        phone,
    }: TUserCreate): Promise<undefined | UserRequest> {
        const url = DB_URL

        const found = await this.get({ email, phone })
        if (found) return undefined

        const newRequest = await initUserRequest({ email, phone })

        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newRequest),
        })

        return newRequest
    }
}

import type { RequestEvent } from './$types'
import { fail, redirect, type ActionFailure } from '@sveltejs/kit'
import { UserRequest } from 'database/UserRequest/UserRequestModels'
import { validateStringField } from 'database/UserRequest/UserRequestValidators'

type T = ActionFailure<{ invalid: string }>

export const actions = {
    default: async ({ request }: RequestEvent): Promise<T> => {
        const data = await request.formData()
        const email = data.get('email')?.toString()
        const phone = data.get('phone')?.toString()

        if (email === undefined || phone === undefined) {
            throw new Error()
        }

        const emailValidation = validateStringField('email', email, false)
        if (!emailValidation.isValid) {
            return fail(400, { invalid: 'email' })
        }

        const phoneValidation = validateStringField('phone', phone, false)
        if (!phoneValidation.isValid) {
            return fail(400, { invalid: 'phone' })
        }

        const client = await UserRequest.get({ email, phone })
        if (client) {
            return fail(400, { invalid: 'exists' })
        }

        await UserRequest.create({ email, phone })
        return redirect(301, '/success')
    },
}

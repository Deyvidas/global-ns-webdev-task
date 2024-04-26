export type TFields = 'email' | 'phone'

type TValidationRegex = {
    [key in TFields]: {
        dynamic: RegExp
        static: RegExp
    }
}

type TValidationResponse<T> = {
    isValid: boolean
    value: T
}

const ValidationRegex: TValidationRegex = {
    email: {
        dynamic: /^[\w-\.]*@?([\w-]+\.)*[\w-]*$/g,
        static: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    },
    phone: {
        dynamic: /^\+7[\d]{0,10}$/g,
        static: /^\+7[\d]{10}$/g,
    },
}

export function validateStringField<T extends string>(
    fieldName: TFields,
    fieldValue: T,
    dynamic: boolean,
): TValidationResponse<T> {
    const regex = ValidationRegex[fieldName][dynamic ? 'dynamic' : 'static']

    const isValid = !!fieldValue.match(regex)
    return { isValid: isValid, value: fieldValue }
}

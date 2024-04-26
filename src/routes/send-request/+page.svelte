<script lang="ts">
    import Input from 'components/Input.svelte'
    import type { ActionData } from './$types'
    import {
        validateStringField,
        type TFields,
    } from 'database/UserRequest/UserRequestValidators'

    export let form: ActionData

    function handleInput(event: Event, value: string) {
        const target = event.target as HTMLInputElement
        const name = target.name as TFields

        const validation = validateStringField(name, value, true)

        if (!validation.isValid) {
            return (values[name] = values[`${name}Previous`])
        }
        return (values[`${name}Previous`] = values[name] = value)
    }

    $: values = {
        email: '',
        phone: '+7',
        emailPrevious: '',
        phonePrevious: '+7',
    }
</script>

<form method="POST">
    <div class="field bordered">
        <label for="email">Email:</label>
        <Input
            onInput={handleInput}
            value={values.email}
            class="field-input"
            type="email"
            required
            id="email"
            name="email" />
    </div>
    {#if form?.invalid === 'email'}
        <p>Введен неверный адрес электронной почты</p>
    {/if}
    <div class="field bordered">
        <label for="phone">Phone:</label>
        <Input
            onInput={handleInput}
            value={values.phone}
            class="field-input"
            required
            id="phone"
            name="phone" />
    </div>
    {#if form?.invalid === 'phone'}
        <p>Введен неверный номер телефона</p>
    {/if}
    <button class="button bordered">Send</button>
</form>
{#if form?.invalid === 'exists'}
    <p class="exist-message">Ваша заявка уже зарегистрирована.</p>
{/if}

<style lang="scss">
    $border-color: gray;
    $padding: 0.5em;

    .exist-message {
        padding-block: 2em;
        text-align: center;
    }

    .bordered {
        border: {
            width: 0.1em;
            style: solid;
            color: $border-color;
            radius: 0.5em;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        row-gap: 1em;
        align-items: center;

        .field {
            display: grid;
            grid-template-columns: 8ch auto;
            align-items: center;
            min-width: 50ch;

            label {
                text-align: end;
                padding-right: $padding;
            }

            :global(.field-input) {
                padding: $padding;
                border-left: 1px solid $border-color;
            }
        }

        .button {
            width: fit-content;
            padding: $padding;
        }
    }
</style>

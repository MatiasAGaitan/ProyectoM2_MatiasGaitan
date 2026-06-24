const{
    validateName,
    validateEmail,
    validateExists,
    validateTitle,
    validateContent,
    validateAuthorId,
    validatePublished
} = require('../src/Utils/validations')

describe('validateName', () => {
    test('acepta nombre valido cuando es obligatorio' , () => {
        expect(validateName("Matias Gaitan", true)).toBe(null)
    })

    test('acepta nombre undefined cuando no es obligatorio' , () => {
        expect(validateName(undefined, false)).toBe(null)
    })

    test('da error cuando no se envia nombre y es obligatorio',() => {
        expect(validateName(undefined,true)).toBe('El nombre es obligatorio')
    }) 
    
    test('rechaza nombre que no es texto',() => {
        expect(validateName(1234,true)).toBe('El nombre debe ser texto')
    }) 
    
    test('rechaza nombre vacio',() => {
        expect(validateName("",true)).toBe('El nombre no puede estar vacio')
    }) 
    
    test('rechaza nombre solo con espacios',() => {
        expect(validateName(" ",true)).toBe('El nombre no puede ser espacios vacios')
    })  
})

describe('validateEmail', () => {
    test('acepta email valido cuando es obligatorio', () => {
        expect(validateEmail('emailexample@example.com',true)).toBe(null)
    })

    test('acepta email undefined cuando no es obligatorio', () => {
        expect(validateEmail(undefined,false)).toBe(null)
    })

    test('da error cuando no se envia email y es obligatorio', () => {
        expect(validateEmail(undefined,true)).toBe("El email es obligatorio")
    })

    test('rechaza email que no es texto', () => {
        expect(validateEmail(1234,true)).toBe("El email debe ser texto")
    })

    test('rechaza email vacio', () => {
        expect(validateEmail("",true)).toBe("El email no puede estar vacio")
    })

    test('rechaza email con solo espacios vacios', () => {
        expect(validateEmail(" ",true)).toBe("El email no puede ser espacios vacios")
    })

    test('rechaza email sin @', () => {
        expect(validateEmail('emailexampleexample.com',true)).toBe('El email debe tener un formato valido')
    })

    test('rechaza email sin dominio', () => {
        expect(validateEmail('emailexample@',true)).toBe('El email debe tener un formato valido')
    })

    test('rechaza email sin extension', () => {
        expect(validateEmail('emailexample@example',true)).toBe('El email debe tener un formato valido')
    })

})

describe('validateExists', () => {
    test('no devuelve error si el elemento existe',() => {
        expect(validateExists("elemento","texto del error")).toBe(null)
    })

    test('devuelve error cuando no existe el elemento',() => {
        const error = validateExists(undefined,'El elemento que buscas no existe')

        expect(error.message).toBe('El elemento que buscas no existe')
        expect(error.status).toBe(404)
    })
})

describe('validateTitle', () => {
    test('acepta titulo cuando es obligatorio', () => {
        expect(validateTitle('titulo ejemplo',true)).toBe(null)
    })

    test('acepta titulo undefined cuando no es obligatorio', () => {
        expect(validateTitle(undefined,false)).toBe(null)
    })

    test('da error cuando no se envia titulo y es obligatorio', () => {
        expect(validateTitle(undefined,true)).toBe('El titulo es obligatorio')
    })

    test('rechaza titulo que no es texto', () => {
        expect(validateTitle(1998,true)).toBe('El titulo debe ser texto')
    })

    test('rechaza titulo vacio', () => {
        expect(validateTitle('',true)).toBe('El titulo no puede estar vacio')
    })

    test('rechaza titulo con solo espacios vacios', () => {
        expect(validateTitle(' ',true)).toBe('El titulo no puede ser espacios vacios')
    })

    test('rechaza titulo con menos de 3 caracteres', () => {
        expect(validateTitle('ab',true)).toBe('El titulo debe tener por lo menos 3 caracteres')
    })
})

describe('validateContent', () => {
    test('acepta contenido cuando es obligatorio', () => {
        expect(validateContent("Este es un contenido de ejemplo",true)).toBe(null)
    })

    test('acepta contenido undefined cuando no es obligatorio', () => {
        expect(validateContent(undefined,false)).toBe(null)
    })

    test('da error cuando no se envia contenido y es obligatorio', () => {
        expect(validateContent(undefined,true)).toBe('El contenido es obligatorio')
    })

    test('rechaza contenido que no es texto', () => {
        expect(validateContent(1234,true)).toBe('El contenido debe ser texto')
    })

    test('rechaza contenido vacio', () => {
        expect(validateContent('',true)).toBe('El contenido no puede estar vacio')
    })

    test('rechaza contenido con solo espacios vacios', () => {
        expect(validateContent(' ',true)).toBe('El contenido no puede ser espacios vacios')
    })

    test('rechaza contenido con menos de 10 caracteres', () => {
        expect(validateContent('ab',true)).toBe('El contenido debe tener por lo menos 10 caracteres')
    })
})

describe('validateAuthorId', () => {
    test('acepta author_id cuando es obligatorio', () => {
        expect(validateAuthorId(1,true)).toBe(null)
    })

    test('acepta author_id undefined cuando no es obligatorio', () => {
        expect(validateAuthorId(undefined,false)).toBe(null)
    })

    test('da error cuando no se envia author_id y es obligatorio', () => {
        expect(validateAuthorId(undefined,true)).toBe('El author_id es obligatorio')
    })

    test('rechaza author_id que no sea numero', () => {
        expect(validateAuthorId('1234',true)).toBe('El author_id debe ser un numero')
    })

    test('rechaza author_id que no sea un numero entero', () => {
        expect(validateAuthorId(1.5,true)).toBe('El author_id debe ser un numero entero')
    })

    test('rechaza author_id que sea menor a 0 ', () => {
        expect(validateAuthorId(-1,true)).toBe('El author_id debe ser mayor a 0')
    })
})

describe('validatePublished', () => {
    test('acepta published cuando es boolean', () => {
        expect(validatePublished(true)).toBe(null)
    })
    
    test('acepta published undefined', () => {
        expect(validatePublished(undefined)).toBe(null)
    })

    test('rechaza published cuando no es boolean', () => {
        expect(validatePublished("true")).toBe('published debe ser true o false (boolean)')
    })

})
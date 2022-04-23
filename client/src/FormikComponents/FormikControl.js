import React from 'react'
import Input from './Input'
import './formiksStyles.css'
function FormikControl({control, ...rest}) {
    
    switch (control) {

        case 'input':
            return <Input {...rest} />
    }
}

export default FormikControl

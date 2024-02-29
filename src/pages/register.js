import { RegisterPage } from '@/features';
import Head from 'next/head';
import React from 'react';

const Register = () => {
    return (
        <div>
            <RegisterPage profileEdit={false} />
        </div>
    )
}

export default Register
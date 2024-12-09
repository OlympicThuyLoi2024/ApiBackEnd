"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({});
module.exports = ({ env }) => ({
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'trungthanhcva2206@gmail.com',
                    pass: 'subg emps hbnl mzky',
                },
            },
            settings: {
                defaultFrom: 'trungthanhcva2206@gmail.com',
                defaultReplyTo: 'trungthanhcva2206@gmail.com',
            },
        },
    },
    'users-permissions': {
        config: {
            register: {
                allowedFields: ['phone', 'ward', 'address', 'health', 'fullname'],
            },
            settings: {
                unique_username: false,
            },
        },
    },
    upload: {
        config: {
            sizeLimit: 250 * 1024 * 1024 // 256mb in bytes
        }
    },
});

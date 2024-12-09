/**
 * @Project ApibackEnd
 * @Author TT(trungthanhcva2206@gmail.com@gmail.com)
 * @Copyright (C) 2024 CHK. All rights reserved
 * @License GNU/GPL version 3.0
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    {
        name: 'strapi::body',
        config: {
            multipart: true,
            formidable: {
                maxFileSize: 10 * 1024 * 1024 * 1024, // Tăng giới hạn tải lên lên 50MB
            },
        },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];

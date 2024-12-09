/**
 * @Project ApibackEnd
 * @Author TT(trungthanhcva2206@gmail.com@gmail.com)
 * @Copyright (C) 2024 CHK. All rights reserved
 * @License GNU/GPL version 3.0
 */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
exports.default = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register( /* { strapi }: { strapi: Core.Strapi } */) { },
    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap({ strapi }) {
        strapi.db.lifecycles.subscribe({
            models: ['api::province.province'],
            afterUpdate: async (event) => {
                const { result, params } = event;
                // Kiểm tra xem trạng thái có được cập nhật không
                if (params.data.Statuss !== undefined) {
                    const newStatus = params.data.Statuss;
                    // Lấy tất cả các huyện thuộc tỉnh này
                    const districts = await strapi.documents('api::district.district').findMany({
                        filters: { province: { documentId: result.documentId } },
                    });
                    // Cập nhật trạng thái cho từng huyện
                    for (const district of districts) {
                        console.log('Updating district:', district.documentId);
                        try {
                            const updatedDistrict = await strapi.documents('api::district.district').update({
                                documentId: district.documentId,
                                data: { Statuss: newStatus },
                                status: 'published',
                            });
                            const wards = await strapi.documents('api::ward.ward').findMany({
                                filters: { district: { documentId: district.documentId } },
                            });
                            for (const ward of wards) {
                                try {
                                    const updatedWard = await strapi.documents('api::ward.ward').update({
                                        documentId: ward.documentId,
                                        data: { Statuss: newStatus },
                                        status: 'published',
                                    });
                                }
                                catch (error) {
                                    console.error('Erroe updating ward: ', error);
                                }
                            }
                        }
                        catch (error) {
                            console.error('Error updating district:', error);
                        }
                    }
                }
            },
        });
        // Hook mới cho District
        strapi.db.lifecycles.subscribe({
            models: ['api::district.district'],
            afterUpdate: async (event) => {
                const { result, params } = event;
                if (params.data.Statuss !== undefined) {
                    const newStatus = params.data.Statuss;
                    const wards = await strapi.documents('api::ward.ward').findMany({
                        filters: { district: { documentId: result.documentId } },
                    });
                    for (const ward of wards) {
                        console.log('Updating ward:', ward.documentId);
                        try {
                            await strapi.documents('api::ward.ward').update({
                                documentId: ward.documentId,
                                data: { Statuss: newStatus },
                                status: 'published',
                            });
                        }
                        catch (error) {
                            console.error('Error updating ward:', error);
                        }
                    }
                }
            },
        });
        strapi.db.lifecycles.subscribe({
            models: ['api::ward.ward'], // Lắng nghe thay đổi trong bảng Ward
            afterUpdate: async (event) => {
                const { result, params } = event;
                // Kiểm tra xem trạng thái có được cập nhật hay không
                if (params.data.Statuss !== undefined) {
                    const newStatus = params.data.Statuss;
                    // Nếu trạng thái chuyển sang false
                    if (!newStatus) {
                        console.log(`Ward ${result.Name} has changed to inactive (Status: ${newStatus})`);
                        try {
                            // Lấy danh sách email và fullname của người dùng trong xã bằng documentId
                            const users = await strapi.documents('plugin::users-permissions.user').findMany({
                                filters: { ward: { documentId: result.documentId } }, // Lọc theo documentId
                                fields: ['email', 'fullname'], // Chỉ lấy email và fullname
                            });
                            const userData = users.map(user => ({
                                email: user.email,
                                fullname: user.fullname,
                            }));
                            console.log(`Found ${userData.length} users in ward ${result.Name}`);
                            if (userData.length > 0) {
                                // Gửi email đến tất cả người dùng
                                for (const user of userData) {
                                    const emailData = {
                                        to: user.email,
                                        subject: `Thông báo về trạng thái xã ${result.Name}`,
                                        text: `Kính gửi ${user.fullname},\n\nTrạng thái xã ${result.Name} đã chuyển sang cách ly. Vui lòng kiểm tra lại thông tin của bạn.\n\nTrân trọng!`,
                                    };
                                    // Gửi email bằng Nodemailer
                                    await strapi.plugin('email').service('email').send(emailData);
                                    console.log(`Email sent to ${user.email}`);
                                }
                            }
                            else {
                                console.log(`No users found in ward ${result.Name}. Skipping email.`);
                            }
                        }
                        catch (error) {
                            console.error(`Error sending emails for ward ${result.Name}:`, error);
                        }
                    }
                }
            },
        });
        strapi.db.lifecycles.subscribe({
            models: ['plugin::users-permissions.user'],
            beforeCreate: async (event) => {
                const { data } = event.params;
                if (data.ward && typeof data.ward === 'string') {
                    console.log('Processing ward for user:', data.username);
                    try {
                        const ward = await strapi.documents('api::ward.ward').findOne({
                            documentId: data.ward
                        });
                        if (ward) {
                            console.log('Found ward:', ward.documentId);
                            data.ward = ward.id;
                        }
                        else {
                            console.log('Ward not found for documentId:', data.ward);
                        }
                    }
                    catch (error) {
                        console.error('Error processing ward for user:', error);
                    }
                }
            },
            afterUpdate: async (event) => {
                const { result, params } = event;
                const today = (0, dayjs_1.default)().startOf('day').toISOString(); // Ngày hiện tại
                // Xác định trạng thái mới của người dùng
                const newHealthStatus = params.data.health;
                // Chỉ thực hiện nếu trạng thái là "Nhiễm bệnh", "Đã chữa khỏi" hoặc "Tử vong"
                if (['Nhiễm bệnh', 'Đã chữa khỏi', 'Tử vong'].includes(newHealthStatus)) {
                    try {
                        // Tìm bản ghi statistic của ngày hôm nay bằng documentId
                        const statistics = await strapi.documents('api::statistic.statistic').findMany({
                            filters: { date: today },
                            limit: 1,
                        });
                        const todayStatistic = statistics[0]; // Lấy bản ghi đầu tiên
                        if (!todayStatistic) {
                            console.error(`Statistic for date ${today} does not exist. Update aborted.`);
                            return;
                        }
                        console.log('Found statistic with documentId:', todayStatistic.documentId);
                        // Cập nhật số liệu dựa trên trạng thái sức khỏe mới
                        const updateData = {};
                        if (newHealthStatus === 'Nhiễm bệnh') {
                            updateData.SoCaMacMoi = Number(todayStatistic.SoCaMacMoi) + 1;
                            updateData.cases = Number(todayStatistic.cases) + 1;
                        }
                        else if (newHealthStatus === 'Đã chữa khỏi') {
                            updateData.SoCaDaChuaKhoi = Number(todayStatistic.SoCaDaChuaKhoi) + 1;
                            updateData.TongSoCaDaChuaKhoi = Number(todayStatistic.TongSoCaDaChuaKhoi) + 1;
                        }
                        else if (newHealthStatus === 'Tử vong') {
                            updateData.SoCaTuVong = Number(todayStatistic.SoCaTuVong) + 1;
                            updateData.TongSoCaTuVong = Number(todayStatistic.TongSoCaTuVong) + 1;
                        }
                        // Thực hiện cập nhật số liệu bằng documentId
                        await strapi.documents('api::statistic.statistic').update({
                            documentId: todayStatistic.documentId,
                            data: updateData,
                            status: 'published', // Đảm bảo trạng thái được cập nhật là "published"
                        });
                        strapi.log.info(`Updated statistic for ${today}: ${newHealthStatus} event logged.`);
                    }
                    catch (error) {
                        strapi.log.error('Error updating statistic:', error);
                    }
                }
            },
        });
    },
};

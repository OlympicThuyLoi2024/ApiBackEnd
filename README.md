# ApiBackEnd
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.html)

Đây là service xây dựng các api của hệ thống SafeZone để kết nối từ cơ sở dữ liệu đến giao diện. Các api được xây dựng tự động bằng nền tảng công nghệ LCDP Strapi

## Changelogs

### v1.0
- Khởi tạo các tự động các API với mỗi bảng trong cơ sở dữ liệu
- Quản lý cơ sở dữ liệu
- Triển khai các Lifecycle Hook để theo dõi, lắng nghe, cập nhật tình trạng của bảng Ward, Province, User, District, Stastic  

## Hướng dẫn cài đặt
### 1. Yêu cầu
#### Yêu cầu về hệ điều hành
| OS              | Recommended | Minimum    |
| --------------- | ----------- | ---------- |
| Ubuntu          | 24.04       | LTS        |
| Debian          | 11          | LTS        |
| RHEL            | 9           | LTS        |
| macOS           | 14          | 12         |
| Windows Desktop | 11          | 10         |
| Windows Server  | No Support  | No Support |
| Docker          | N/A         | N/A        |
#### Yêu cầu về Database
| Database   | Recommended | Minimum |
| ---------- | ----------- | ------- |
| MySQL      | 8.0         | 8.0     |
| MariaDB    | 11.2        | 10.3    |
| PostgreSQL | 16.0        | 14.0    |
| SQLite     | 3           | 3       |
#### Yêu cầu về công cụ
Để cài đặt và chạy được dự án, trước tiên bạn cần phải cài đặt các công cụ bên dưới. Hãy thực hiện theo các hướng dẫn cài đặt sau, lưu ý chọn hệ điều hành phù hợp với máy tính của bạn:
- [NodeJS v18-Installation](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/)
### 2. Cài đặt dự án
#### Bước 1: Clone hoặc Fork dự án

1. Clone hoặc Fork dự án của bạn tại: [https://github.com/OlympicThuyLoi2024/ApiBackEnd](https://github.com/OlympicThuyLoi2024/ApiBackEnd)

#### Bước 2: Cài đặt phụ thuộc

Chạy các lệnh sau để cài đặt các phụ thuộc của dự án:

```bash
# Cài đặt các phụ thuộc của dự án
npm install
# hoặc sử dụng yarn
yarn install
```
#### Bước 3: Cấu hình môi trường

Tạo file `.env` tại thư mục gốc của dự án và cấu hình các biến môi trường cần thiết. Dưới đây là một ví dụ:

```bash
HOST=0.0.0.0
PORT=1337
NODE_ENV=development

# Database
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=strapi_db
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=Your_Password
DATABASE_SSL=false

```
#### Bước 4: Chạy dự án:
```bash
npm run develop
# hoặc sử dụng yarn
yarn develop
```
#### Bước 5: Truy cập vào Strapi Admin Panel
Sau khi chạy thành công, truy cập vào Strapi Admin Panel tại địa chỉ: http://localhost:1337/admin và tạo tài khoản quản trị viên để bắt đầu sử dụng.

## Đóng góp cho dự án

<a href="https://github.com/OlympicThuyLoi2024/ApiBackEnd/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=BUG">Bug Report ⚠️
</a>

<a href="https://github.com/OlympicThuyLoi2024/ApiBackEnd/issues/new?assignees=&labels=&projects=&template=feature_template.md&title=Feature">Request Feature 👩‍💻</a>

Nếu bạn muốn đóng góp cho dự án, hãy đọc [CONTRIBUTING.md](.github/CONTRIBUTING.md) để tìm hiểu thêm chi tiết.

Chúng tôi rất trân trọng mọi đóng góp từ các bạn. Đừng ngần ngại tạo pull request và gửi đến dự án.

## Tác giả
- Nguyễn Lê Trung Thành
- Trần Tuấn Anh
- Lê Văn Quang

# License
Phần mềm sử dụng License  [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.html)


# ❓❓ HIDDEN CODE - MẬT MÃ BÍ ẨN ❓❓
**Hidden Code**: là một trò chơi trả lời câu hỏi. Mỗi câu trả lời đúng sẽ nhận được một gợi ý và sau khi trả lời hết tất cả các câu hỏi thì sẽ giải ra một mật mã gồm 3 chữ số.

### Mục đích sử dụng
**Hidden Code** được sử dụng làm phần trò chơi củng cố sau mỗi bài thuyết trình.

### Lợi ích của Hidden Code
- Có thể sử dụng được nhiều lần.
- Có thể thay đổi câu hỏi nhanh chóng với giao diện cung cấp sẵn.
- Giúp bài thuyết trình trở nên độc đáo hơn.

### Công nghệ sử dụng
- HTML.
- CSS.
- JAVASCRIPT.
- FIREBASE ( Firestore, Hosting ).

### Các chức năng
- Chọn câu hỏi.
- Chọn đáp án.
- Chức năng gợi ý.
- Chức năng thêm câu hỏi.
- Chức năng xóa câu hỏi.

**Thông tin thêm**: 
- Số lượng câu hỏi tối đa được hiển thị là 5. Nếu người dùng nhập vào nhiều hơn 5 câu hỏi thì hệ thống sẽ chọn ngẫu nhiên 5 trong tổng số câu hỏi để hiển thị.
- Hệ thống sẽ tự động tạo ngẫu nhiên mật mã và các gợi ý.
- Nếu trong quá trình sử dụng vô tình tắt trang thì các câu hỏi sẽ được lưu lại vì **Hidden Code** có chức năng ghi nhớ các câu hỏi đã trả lời.

### Đường dẫn trang web
**Ứng dụng demo**: [Hidden Code](https://hidden-code-90a43.web.app/)
- **Mật khẩu**: adminHidden

# ✨✨ CÁCH GIẢI MẬT MÃ ✨✨
**🤓Giải thích gợi ý**:
- Gợi ý là ***1 chữ số***. VD: 1, 2, 5, 0, 9... Đây sẽ là những con số để tạo thành **mật mã gồm 3 chữ số**.
- Gợi ý là ***2 chữ số***. VD: 13, 12, 23,... Đây sẽ là gợi ý cho biết **vị trí của con số** đã thu thập được.**VD**: 
    - **12**: nghĩa là số thứ **1** được tìm thấy đặt ở vị trí thứ **2**.
    - **23**: nghĩa là số thứ **2** được tìm thấy đặt ở vị trí thứ **3**.

Giả sử đã trả lời đúng hết 5️⃣ câu hỏi. Và thứ tự lựa chọn câu hỏi và gợi ý nhận được như sau:
- **Câu 2** có gợi ý là 4. 
- **Câu 1** có gợi ý là 1. 
- **Câu 4** có gợi ý là 7. 
- **Câu 5** có gợi ý là 12. 
- **Câu 3** có gợi ý là 31. 

Theo thứ tự trên thì con số có được là **417** (Xếp theo thứ tự mà mỗi con số được tìm thấy) và hai gợi ý là **12** và **31**.
**Mật mã gồm 3 số**: xxx
- **12**: số thứ **1** được tìm thấy đặt ở vị trí thứ **2** ==> **x4x**
- **31**: số thứ **3** được tìm thấy đặt ở vị trí thứ **1** ==> **74x**

**🔥Vậy mật mã thu được là** 7️⃣4️⃣1️⃣


# 🤔🤔 NHỮNG CÂU HỎI THƯỜNG GẶP 🤔🤔
**Tại sao không dùng PowerPoint/Canva để làm trò chơi củng cố?**
- **Thời gian**: 
    - PowerPoint có thể được dùng để tạo ra trò chơi cũng cố nhanh hơn là điều tất yếu. 
    - Nhưng nếu xét đến những lúc gấp rút để thiết kế trò chơi hoặc những bài thuyết trình có thời gian diễn ra gần nhau thì **Hidden Code** lại có thời gian chỉnh sửa nhanh hơn vì chỉ cần thay đổi nội dung của câu hỏi. 

- **Tái sử dụng**: 
    - **Hidden Code** chỉ cần chỉnh sửa nội dung câu hỏi nên nó có thể được tái sử dụng nhiều lần.
    - **PowerPoint** cũng chỉ cần chỉnh sửa nội dung nhưng người chỉnh sửa sẽ cần phải thay đổi lại trật tự của các câu trả lời.

**Tại sao lại phải viết làm trò chơi bằng code cho mệt**
- **Mặt tiêu cực**:
    - Cực.
    - Mất thời gian.
- **Mặt tích cực**
    - Luyện tập được kỹ năng lập trình của bản thân.
    - Nâng cao được tư duy logic khi phải tạo ra một cách chơi mới lạ chứ không đơn thuần chỉ là **"chọn đáp án đúng"**.
    - Trò chơi có thể được xem là một dự án cá nhân để đưa vào CV.
    - Có thể tái sử dụng nhanh chóng cho các bài thuyết trình gấp rút.
    - Tạo sự khác biệt với các nhóm khác.
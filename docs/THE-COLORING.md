# Triết lý thiết kế — Hệ màu

Một tài liệu mô tả cách suy nghĩ về màu sắc và thị giác trong sản phẩm. Không bàn về kỹ thuật, không bàn về bố cục — chỉ tập trung vào _vì sao_ và _như thế nào_ khi nói đến màu.

---

## Hai giá trị cốt lõi

Toàn bộ hệ thị giác được xây dựng quanh hai từ: **chính xác** và **bình tĩnh**.

Chính xác vì đây là sản phẩm cho người dùng làm việc với dữ liệu — họ cần cảm nhận được rằng công cụ này nghiêm túc, có chủ đích, không phải một template tô màu. Bình tĩnh vì họ sẽ nhìn vào màn hình hàng giờ — màu sắc phải nâng đỡ, không gào thét.

Mọi quyết định màu sau đây đều có thể truy về một trong hai giá trị này. Nếu một lựa chọn không phục vụ chính xác hoặc bình tĩnh, nó không thuộc về hệ thống.

---

## Vì sao teal

Teal là một quyết định có chủ đích, không phải một sở thích.

Trong landscape của các sản phẩm dev-oriented hiện nay, vùng màu lạnh từ 230° đến 290° đã quá đông — indigo, purple, violet là lựa chọn mặc định của hầu hết SaaS dashboard và developer tool. Chọn ở đó là chọn vô danh.

Teal nằm ở khoảng **180°–200°** trên bánh xe màu, giữa lam và lục. Vùng này có hai đặc tính hiếm:

Thứ nhất, nó _thoát ra khỏi đám đông_ mà không gây sốc. Teal không bốc đồng như magenta, không cảnh báo như cam, không trẻ con như lime. Nó đứng riêng nhưng vẫn nghiêm túc.

Thứ hai, nó _kế thừa cảm giác kỹ thuật của lam_ mà vẫn có _hơi ấm của lục_ — bởi lục thường gắn với sinh học, tự nhiên, sự sống. Teal vì thế cho phép sản phẩm vừa nói "tôi chính xác" vừa nói "tôi gần gũi". Hai thông điệp này thường loại trừ nhau với các hue khác.

Cụ thể, hệ thống dùng **hue 195°** — gần phía lam hơn lục một chút. Đây là teal "kỹ thuật" hơn là teal "biển". Nếu kéo về 180° sẽ thành cyan, mất đi tính chất; nếu kéo về 210° sẽ thành lam phổ thông, mất đi sự khác biệt.

---

## Kiến trúc tông màu

Hệ màu không phải một màu — nó là một **thang 12 bậc** tại cùng một hue 195°. Mỗi bậc có một vai trò cụ thể trong sản phẩm:

| Bậc | Vai trò                                |
| --- | -------------------------------------- |
| 1   | Nền chính của trang                    |
| 2   | Bề mặt thứ cấp, vùng nhấn nhẹ          |
| 3   | Nền của thành phần UI                  |
| 4   | Trạng thái hover của thành phần        |
| 5   | Trạng thái active / pressed            |
| 6   | Viền nhẹ, divider                      |
| 7   | Viền chuẩn của thành phần              |
| 8   | Viền khi hover                         |
| 9   | Màu chủ đạo — nút primary, link, focus |
| 10  | Hover của màu chủ đạo                  |
| 11  | Text độ tương phản thấp                |
| 12  | Text độ tương phản cao                 |

Cách phân bậc này có ba nguyên tắc:

**Đồng nhất về cảm nhận, không phải về toán học.** Hệ thống xây trên không gian màu OKLCH thay vì HSL hay RGB. Lý do: mắt người không cảm nhận độ sáng theo tuyến tính. Trong HSL, lightness 50% của lam và vàng là hai độ sáng khác nhau hoàn toàn — vàng chói hơn lam rất nhiều dù số bằng nhau. OKLCH sửa điều này — L=0.5 ở mọi hue đều cho cùng cảm giác độ sáng. Khi thang được xây trong OKLCH, từng bậc cách đều mắt người, không cách đều "số".

**Đỉnh chroma nằm ở giữa.** Saturation (chroma) không phẳng từ 1 đến 12. Nó cao nhất ở bậc 9 (C ≈ 0.097) và _giảm dần_ về cả hai phía. Bậc 1 gần như trắng tinh; bậc 12 gần như đen tinh. Đây là quy luật của ánh sáng — màu thuần khiết không tồn tại ở vùng quá sáng hoặc quá tối; cứ đẩy chroma cao ở extremes thì thành màu phấn hoặc bùn.

**Mỗi bậc là một quyết định, không phải một tô đậm.** Không có bậc nào "dự phòng". Nếu một bậc không có vai trò rõ ràng, nó không tồn tại trong hệ thống.

---

## Hai trạng thái thị giác

Hệ thống có hai chế độ làm việc, và phải luôn luôn rõ ràng người dùng đang ở chế độ nào.

**Bề mặt làm việc** — nơi người dùng đọc, phân tích, thao tác. Dùng bậc 1 và 2 làm nền, bậc 11–12 làm text, bậc 9 làm điểm nhấn dè dặt cho link và CTA quan trọng. Đặc trưng: gần như trắng, mắt không mệt, dữ liệu là nhân vật chính. Teal chỉ thoáng hiện qua viền và link.

**Bề mặt thương hiệu (brand moment)** — nơi sản phẩm tự giới thiệu. Dùng bậc 12 làm nền (gần như đen với chút teal), text trắng, điểm nhấn bằng bậc 9 sáng rực. Đặc trưng: đậm, tự tin, có grain pattern subtle để thêm depth. Đây là khoảnh khắc _được phép gào lên_ — hero của About page, đầu trang marketing, CTA cuối cùng trước khi user đăng ký.

Sai lầm hay gặp là _trộn hai trạng thái này_. Một dashboard dùng nền đậm thương hiệu khắp mọi nơi sẽ mệt mỏi sau 10 phút. Một About page dùng nền trắng nhạt khắp mọi nơi sẽ vô danh. Chúng phục vụ hai mục đích khác nhau — giữ chúng tách bạch.

Trong một trang dài, **bề mặt thương hiệu xuất hiện ở đầu và cuối**, bề mặt làm việc ở giữa. Rhythm này không phải ngẫu nhiên — nó phản ánh hành trình thị giác: ấn tượng → đọc → quyết định.

---

## Thứ bậc của màu

Hệ thống màu có ba lớp, và lớp nào trên lớp nào không bao giờ được lẫn lộn:

**Brand (teal)** — chỉ dùng để truyền đạt bản sắc và dẫn dắt sự chú ý đến hành động chính. Mỗi trang nên có _một_ primary CTA dùng màu này. Nếu mọi nút đều teal, không nút nào là primary.

**Neutral (gray-tinted teal)** — chiếm 85–90% diện tích pixel. Đây là bề mặt, viền, text body. Lý tưởng là một thang gray được tint nhẹ về cùng phía lạnh (220°–230°) để hài hòa với teal. Pure gray bên cạnh teal trông rời rạc.

**Semantic (red, amber, green)** — chỉ dùng cho ý nghĩa hệ thống: lỗi, cảnh báo, thành công. Ba màu này _không bao giờ_ được mượn cho mục đích thương hiệu hay trang trí. Nếu nút "Đăng ký" của bạn cũng màu xanh lá, người dùng sẽ không phân biệt được giữa "thao tác thành công" và "đây là một nút bình thường". Kênh ngữ nghĩa là tài sản quý — không tiêu xài bừa bãi.

Đây là lý do quan trọng nhất _không_ chọn lam (xung đột với info), lục (xung đột với success), hay vàng (xung đột với warning) làm màu thương hiệu chính.

---

## Kỹ thuật phép nhấn hai màu

Trong các hero và headline lớn, dùng kỹ thuật **split-color**: một phần câu trắng, một phần câu màu teal-9.

> Báo cáo theo ngày, **không phải theo phút.**

Vế đầu trung lập, mô tả. Vế sau nhấn, mang giá trị cốt lõi. Mắt người tự động đọc vế teal trước — đó là chỗ thông điệp thực sự nằm. Kỹ thuật này hiệu quả hơn bold hoặc italic vì màu là dimension độc lập với font weight.

Quy tắc: chỉ dùng split-color ở H1 và 1–2 headline quan trọng nhất. Lạm dụng làm mất tác dụng. Vế màu nên là **value proposition**, không phải subject của câu.

---

## Một số đặc tính của thị giác cần biết

**Hiệu ứng Helmholtz–Kohlrausch.** Màu bão hòa cao trông sáng hơn màu xám có cùng độ lightness toán học. Bậc 9 ở L=0.57 thực ra trông như khoảng L=0.62 với mắt người. Hệ quả: khi đặt brand color cạnh neutral cùng L, neutral sẽ trông tối hơn. Phải bù bằng cách cho brand thấp L hơn neutral một chút.

**Chroma không tỉ lệ với hue ở extremes.** Vàng có thể đạt C rất cao trước khi out of gamut; lam thì max sớm hơn. Khi xây thang ở hue 195°, đỉnh chroma đạt ~0.10–0.12, không thể cao hơn mà không clip. Đây là giới hạn vật lý của màn hình, không phải lựa chọn thiết kế.

**Contrast không tuyến tính ở đầu thang.** Khoảng cách thị giác từ L=0.95 xuống L=0.90 nhỏ hơn nhiều so với từ L=0.20 xuống L=0.15. Đó là lý do dark mode không phải invert đơn giản — đường cong L của dark mode khác hoàn toàn light mode.

---

## Quan hệ light–dark

Dark mode không phải light mode "đảo ngược". Nó là một hệ riêng, được tune độc lập, nhưng giữ nguyên _hue_ và _thứ bậc vai trò_.

Khác biệt then chốt:

**Đường cong L khác.** Light mode đi từ L=0.99 xuống L=0.27. Dark mode đi từ L=0.18 lên L=0.94. Không phải đối xứng — bước nhảy giữa các bậc dày hơn ở đầu sáng, mỏng hơn ở đầu tối, phản ánh cách mắt cảm nhận.

**Chroma cao hơn ở bậc chủ đạo.** Trong dark mode, bậc 9 cần C ≈ 0.115 (so với 0.097 ở light mode) để brand color vẫn pop trên nền tối. Mắt cần _nhiều chroma hơn_ để cảm nhận cùng một mức "sống động" khi nền tối.

**Trắng tinh không bao giờ dùng làm text.** Trong dark mode, text "trắng" thực ra là teal-12 ở L=0.94, có chút tint teal. Trắng tinh #FFFFFF trên nền đen quá chói, gây strain. Pure white chỉ dùng trên _brand surface_ (nền teal-12 đậm) chứ không trên app background.

---

## Quy tắc thực hành

Một số điều rút ra thành nguyên tắc rõ ràng:

**Nên:**

- Giữ một hue duy nhất cho toàn bộ thang. Hệ thống một-hue dễ duy trì hơn nhiều so với multi-hue.
- Cho phép brand color "nghỉ" — không phải mọi nút đều cần teal-9.
- Thiết kế cho light mode trước, dark mode tune sau. Light mode dễ phát hiện vấn đề tương phản hơn.
- Test mọi cặp text/background ở cả hai chiều — text-on-bg và bg-as-text-host.
- Coi viền (bậc 6, 7) như công cụ chính để tạo cấu trúc, không phải shadow hay background-change.

**Tránh:**

- Đẩy chroma lên cao nhất có thể "cho đẹp". Vùng đỉnh chroma chỉ dành cho bậc 9.
- Dùng pure black hoặc pure white. Cả hai đều thiếu sự sống — luôn tint nhẹ về phía hue chính.
- Dùng brand color cho destructive action (xóa, hủy, cảnh báo). Đây là kênh semantic, không phải brand.
- Tạo gradient nhiều màu. Gradient teal-9 → teal-11 thì OK; teal → purple thì không.
- Lạm dụng split-color headline. Một trang có nhiều hơn 2 chỗ là dấu hiệu lạm dụng.

---

## Tổng kết

Hệ thống màu này không phải bảng palette để chọn lựa — nó là một _ngôn ngữ_ với cú pháp riêng. Hue 195° là vốn từ. Thang 12 bậc là ngữ pháp. Hai trạng thái thị giác (làm việc / thương hiệu) là hai thanh điệu. Thứ bậc brand–neutral–semantic là quy tắc dùng từ.

Một designer mới vào dự án có thể đọc xong tài liệu này và biết khi nào dùng bậc 9 thay vì bậc 11, vì sao hero dùng bậc 12 mà dashboard không, và vì sao một button "Delete" không bao giờ được phép có màu teal.

Khi có nghi vấn về một lựa chọn màu, hỏi lại hai câu: _Lựa chọn này phục vụ chính xác hay bình tĩnh? Nó có vi phạm thứ bậc brand–neutral–semantic không?_ Hai câu hỏi này đủ để giải quyết 90% tình huống.

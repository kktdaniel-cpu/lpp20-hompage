from fpdf import FPDF

def make_pdf(filename, title, subtitle):
    pdf = FPDF()
    pdf.add_page()
    # 배경색
    pdf.set_fill_color(74, 107, 40)
    pdf.rect(0, 0, 210, 297, 'F')
    # 제목
    pdf.set_font('Helvetica', 'B', 28)
    pdf.set_text_color(232, 201, 107)
    pdf.set_y(80)
    pdf.cell(0, 20, title, align='C')
    pdf.ln(25)
    # 부제목
    pdf.set_font('Helvetica', '', 14)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(0, 10, 'Technology Brochure', align='C')
    pdf.ln(12)
    pdf.set_font('Helvetica', '', 11)
    pdf.cell(0, 8, 'Life 2.0 / Mossrium Solutions', align='C')
    pdf.ln(10)
    pdf.cell(0, 8, subtitle, align='C')
    pdf.ln(30)
    # 안내문
    pdf.set_font('Helvetica', 'I', 10)
    pdf.set_text_color(200, 220, 180)
    pdf.cell(0, 8, '* This is a placeholder document.', align='C')
    pdf.ln(8)
    pdf.cell(0, 8, 'Please replace with the actual brochure file.', align='C')
    pdf.output(filename)
    print(f'Created: {filename}')

make_pdf(
    '/home/ubuntu/webdev-static-assets/tree100-brochure.pdf',
    'Tree100',
    'Carbon-Negative Tree Cultivation Technology'
)
make_pdf(
    '/home/ubuntu/webdev-static-assets/mossrium-brochure.pdf',
    'MOSS-RIUM',
    'Living Moss Air Purification System'
)

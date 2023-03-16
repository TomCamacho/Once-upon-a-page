import nodemailer from 'nodemailer'

export const sendEmail = async (email, dataOrder) => {
  const books = dataOrder.products.map((book, i) => {
    if (i < dataOrder.products.length - 1) return `Product Name: ${book.title.toUpperCase()}, Quantity: ${book.quantity}, Price: ${book.price}  |  `
    else return `Product Name: ${book.title.toUpperCase()}, Quantity: ${book.quantity}, Price: ${book.price}`
  })
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'onceuponapageofficial@gmail.com',
      pass: 'cgjrkzxwegetchgh',
    },
  })
  const mail = await transporter.sendMail({
    from: 'onceuponapageofficial@gmail.com',
    to: email,
    subject: 'Payment Confirmation',
    text: `Your order was successfully completed!\n\nYour order:\n  - Order number: ${dataOrder.numberOfOrder}\n  - Total quantity: ${dataOrder.totalQuantity}\n  - Date: ${dataOrder.date.toLocaleDateString()}\n  - Buyer: ${dataOrder.user.fullName}, ${dataOrder.user.email}\n  - Products: ${books}\n  - Total amount: USD ${dataOrder.totalAmount}`,
  })
}

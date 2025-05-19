import nodemailer from 'nodemailer';

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: import.meta.env.MAIL_HOST,  
            port: 465, 
            secure: true, 
            auth: {
                user: import.meta.env.MAIL_USER,  
                pass: import.meta.env.MAIL_PASS,  
            },
        });

        let info = await transporter.sendMail({
            from: import.meta.env.MAIL_USER,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent successfully: ");
        return info;
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
};

export default mailSender;

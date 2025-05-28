import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    // 检查Resend API密钥
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment variables')
      return NextResponse.json(
        { 
          error: 'Email service not configured - RESEND_API_KEY missing',
          debug: 'Environment variable RESEND_API_KEY is not set'
        },
        { status: 503 }
      )
    }

    // 初始化Resend
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { to, subject, content, customMessage, imageAttachment, recipientType } = await request.json()
    let actualRecipient = to
    
    // 如果指定了 recipientType 为 "contributor" 或者 to 字段为空/未定义，使用贡献者邮箱
    if (recipientType === "contributor" || !to) {
      const contributorEmail = process.env.CONTRIBUTOR_EMAIL
      if (!contributorEmail) {
        console.error('CONTRIBUTOR_EMAIL not found in environment variables')
        return NextResponse.json(
          { 
            error: 'Contributor email not configured - CONTRIBUTOR_EMAIL missing',
            debug: 'Environment variable CONTRIBUTOR_EMAIL is not set'
          },
          { status: 503 }
        )
      }
      actualRecipient = contributorEmail
    }

    console.log('Request data received:', {
      to: actualRecipient ? 'provided' : 'missing',
      subject: subject ? 'provided' : 'missing',
      content: content ? 'provided' : 'missing',
      hasCustomMessage: !!customMessage,
      hasImageAttachment: !!imageAttachment,
      recipientType: recipientType || 'custom'
    })

    // 验证必要字段
    if (!actualRecipient || !subject || !content) {
      console.error('Missing required fields:', { to: !!actualRecipient, subject: !!subject, content: !!content })
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, or content' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(actualRecipient)) {
      console.error('Invalid email format:', actualRecipient)
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // 设置发送者邮箱 - 使用Resend验证的域名
    // 注意：你需要在Resend中验证一个域名，然后使用该域名的邮箱
    const fromEmail = process.env.FROM_EMAIL || 'questionnaire@resend.dev'
    
    console.log('Using FROM email:', fromEmail)
    console.log('Sending TO email:', actualRecipient)

    // 准备邮件数据
    const emailData: any = {
      from: fromEmail,
      to: [actualRecipient],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">✨ 梦幻问卷调查报告 ✨</h1>
            <p style="color: #fce7f3; margin: 10px 0 0 0; font-size: 16px;">来自梦幻问卷调查应用的分享</p>
          </div>
          
          ${customMessage ? `
            <div style="background: #fdf2f8; border: 2px solid #f9a8d4; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
              <h3 style="color: #be185d; margin: 0 0 10px 0;">💕 来自发送者的话：</h3>
              <p style="color: #831843; line-height: 1.6; margin: 0;">${customMessage.replace(/\n/g, '<br>')}</p>
            </div>
          ` : ''}
          
          <div style="background: #ffffff; border: 2px solid #f9a8d4; border-radius: 10px; padding: 25px;">
            <pre style="white-space: pre-wrap; font-family: 'Courier New', monospace; color: #831843; line-height: 1.6; margin: 0; font-size: 12px;">${content}</pre>
          </div>
          
          ${imageAttachment ? `
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #fdf2f8; border-radius: 10px;">
              <p style="color: #be185d; margin: 0; font-size: 14px;">
                📸 <strong>报告长图已作为附件发送</strong> 📸
              </p>
            </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #fdf2f8; border-radius: 10px;">
            <p style="color: #be185d; margin: 0; font-size: 14px;">
              💖 此邮件由 <strong>梦幻问卷调查应用</strong> 自动发送 💖
            </p>
            <p style="color: #be185d; margin: 5px 0 0 0; font-size: 12px;">
              生成时间: ${new Date().toLocaleString('zh-CN')}
            </p>
          </div>
        </div>
      `,
      text: content
    }

    // 如果有图片附件，添加到邮件数据中
    if (imageAttachment && imageAttachment.content) {
      try {
        emailData.attachments = [
          {
            filename: imageAttachment.filename || '梦幻问卷调查报告.png',
            content: imageAttachment.content,
            type: imageAttachment.contentType || 'image/png'
          }
        ]
        console.log('Image attachment added to email')
      } catch (attachmentError) {
        console.error('Error processing attachment:', attachmentError)
        // 继续发送邮件，但不包含附件
      }
    }

    console.log('Attempting to send email via Resend...')

    // 发送邮件
    const { data, error } = await resend.emails.send(emailData)

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to send email via Resend',
          details: error.message || 'Unknown Resend error',
          debug: error
        },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', data)

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id,
      hasAttachment: !!imageAttachment,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('API route error:', error)
    
    // 提供更详细的错误信息
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : 'No stack trace'
    
    console.error('Error details:', {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// 添加OPTIONS方法支持CORS（如果需要）
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
} 
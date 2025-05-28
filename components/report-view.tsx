"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { FormData } from "@/types/questionnaire"
import { ArrowLeft, Download, Heart, Star, Sparkles, Crown, Flower, Mail, Send, ExternalLink, Info, FileText, Image, FileDown } from "lucide-react"
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface ReportViewProps {
  data: FormData
  onBack: () => void
}

export function ReportView({ data, onBack }: ReportViewProps) {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)
  const [emailForm, setEmailForm] = useState({
    recipientEmail: "",
    recipientType: "contributor", // "contributor" or "custom"
    sendMethod: "api", // "mailto" or "api" - 默认使用API发送
    customMessage: "",
    emailClient: "default" // "default", "outlook", "gmail", "yahoo"
  })
  const [isEmailSending, setIsEmailSending] = useState(false)

  // 生成报告文本内容
  const generateReportText = (data: FormData) => {
    return `
✨ 梦幻个人兴趣问卷调查报告 ✨
生成时间: ${new Date().toLocaleString("zh-CN")}

=== 💕 基本信息 ===
称呼: ${data.name || "未填写"}
年龄: ${data.age || "未填写"}
身高: ${data.height ? data.height + "cm" : "未填写"}
血型: ${data.bloodType || "未填写"}
生日: ${data.birthday || "未填写"}
体型: ${data.bodyType || "未填写"}
发质: ${data.hairTexture || "未填写"}
皮肤: ${data.skinColor || "未填写"}

=== 🌸 外貌特征 ===
发型: ${data.hairLength || "未填写"}
发色: ${data.hairColor || "未填写"}
肤色: ${data.skinTone || "未填写"}
指甲偏好: ${data.nailPreference || "未填写"}

=== 💜 性格与心理 ===
MBTI: ${data.mbti || "未填写"}
人格类型: ${data.personalityType || "未填写"}
性格特点: ${data.personality || "未填写"}
缺点: ${data.weaknesses || "未填写"}
情史: ${data.loveHistory || "未填写"}
过去: ${data.pastExperience || "未填写"}
家庭: ${data.family || "未填写"}
喜欢的伴侣类型: ${data.partnerType || "未填写"}
社交偏好: ${data.socialPreference || "未填写"}

=== 🎀 生活偏好 ===
饮食偏好: ${data.dietPreference || "未填写"}
天气偏好: ${data.weatherPreference || "未填写"}
时间偏好: ${data.timePreference || "未填写"}
口味偏好: ${data.tastePreference || "未填写"}
饮品偏好: ${data.drinkPreference || "未填写"}
奶制品偏好: ${data.milkPreference || "未填写"}
运动偏好: ${data.exercisePreference || "未填写"}

=== 🌺 兴趣爱好 ===
喜欢的颜色: ${data.favoriteColors || "未填写"}
喜欢的穿搭: ${data.favoriteStyle || "未填写"}
喜欢的风格: ${data.favoriteStyleType || "未填写"}
喜欢的音乐: ${data.favoriteMusic || "未填写"}
喜欢的歌曲: ${data.favoriteSongs || "未填写"}
喜欢的歌手: ${data.favoriteSingers || "未填写"}
喜欢的照片: ${data.favoritePhotos || "未填写"}
喜欢的电影: ${data.favoriteMovies || "未填写"}
喜欢的动漫: ${data.favoriteAnime || "未填写"}
喜欢的角色: ${data.favoriteCharacters || "未填写"}
喜欢的IP: ${data.favoriteIP || "未填写"}
喜欢的博主: ${data.favoriteBloggers || "未填写"}
喜欢的爱豆: ${data.favoriteIdols || "未填写"}
喜欢的书籍: ${data.favoriteBooks || "未填写"}
喜欢的作家: ${data.favoriteAuthors || "未填写"}
喜欢的季节: ${data.favoriteSeason || "未填写"}
喜欢的天气: ${data.favoriteWeather || "未填写"}
喜欢的城市: ${data.favoriteCity || "未填写"}
喜欢的国家: ${data.favoriteCountry || "未填写"}
喜欢的花: ${data.favoriteFlowers || "未填写"}
喜欢的语种: ${data.favoriteLanguages || "未填写"}
喜欢的小动物: ${data.favoriteAnimals || "未填写"}
喜欢的菜式: ${data.favoriteCuisine || "未填写"}
喜欢的食物: ${data.favoriteFood || "未填写"}
喜欢的风景: ${data.favoriteScenery || "未填写"}
喜欢的文化: ${data.favoriteCulture || "未填写"}
喜欢的朋友: ${data.favoriteFriends || "未填写"}
喜欢的拍照姿势: ${data.favoritePhotoStyle || "未填写"}
喜欢的运动方式: ${data.favoriteExercise || "未填写"}
消遣方式: ${data.leisureActivities ? data.leisureActivities.join(", ") : "未填写"}

=== 🎈 生活习惯 ===
输入法偏好: ${data.inputMethod || "未填写"}
食物质地偏好: ${data.foodTexture || "未填写"}
睡眠习惯: ${data.sleepHabits || "未填写"}
小癖好: ${data.quirks || "未填写"}
过敏原: ${data.allergies || "无"}
香水偏好: ${data.perfumePreference || "未填写"}

=== ✨ 详细特征 ===
会不会做饭: ${data.canCook || "未填写"}
会不会挑食: ${data.isPicky || "未填写"}
好不好骗: ${data.isGullible || "未填写"}
会不会抽烟: ${data.smoking || "未填写"}
属性娃娃的舞台妆造: ${data.dollMakeup || "未填写"}
撒娇是什么样子: ${data.actingCute || "未填写"}
睡眠质量: ${data.sleepQuality || "未填写"}
睡觉会不会踢被子: ${data.kickBlanket || "未填写"}
睡觉喜欢什么姿势: ${data.sleepPosition || "未填写"}
为什么每天精力旺盛: ${data.energySource || "未填写"}
酒量: ${data.alcoholTolerance || "未填写"}
无聊的时候会做些什么: ${data.boredActivities || "未填写"}
阴暗面: ${data.darkSide || "未填写"}
喝醉之后会耍什么酒疯: ${data.drunkBehavior || "未填写"}
喜欢收到什么样的礼物: ${data.giftPreference || "未填写"}
生气的时候会是什么样子: ${data.angerStyle || "未填写"}
喜欢看什么类型的小电影: ${data.movieType || "未填写"}
喜欢以什么样的方式调情: ${data.flirtingStyle || "未填写"}
吵架的时候会以什么方式解决: ${data.conflictResolution || "未填写"}
为什么眉毛有一边只有一半: ${data.eyebrowStory || "未填写"}

=== 💖 个人想法 ===
未来规划: ${data.lifeGoals || "未填写"}
三观: ${data.values || "未填写"}
生日愿望: ${data.birthdayWish || "未填写"}
奇怪想法: ${data.randomThoughts || "未填写"}
反感事物（总体）: ${data.dislikes || "未填写"}
反感的食物: ${data.dislikedFood || "未填写"}
反感的人: ${data.dislikedPeople || "未填写"}
反感的行为: ${data.dislikedBehavior || "未填写"}
反感的类型: ${data.dislikedType || "未填写"}
反感的规矩: ${data.dislikedRules || "未填写"}
反感的圈子: ${data.dislikedCircles || "未填写"}
为什么会反感: ${data.dislikeReasons || "未填写"}
恋爱类型偏好: ${data.loveType || "未填写"}
恋爱节奏偏好: ${data.relationshipStyle || "未填写"}
对快餐式恋爱的态度: ${data.fastLoveAttitude || "未填写"}
内心想法: ${data.deepThoughts || "未填写"}
    `.trim()
  }

  // 创建临时容器用于图片生成
  const createTempContainer = (backgroundColor: string): HTMLElement => {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.top = '0'
    container.style.width = '800px'
    container.style.backgroundColor = backgroundColor
    container.style.padding = '20px'
    container.style.fontFamily = 'system-ui, -apple-system, sans-serif'
    return container
  }

  // 清理克隆元素的样式
  const cleanClonedElement = (element: HTMLElement): void => {
    element.style.position = 'relative'
    element.style.transform = 'none'
    element.style.filter = 'none'
    element.style.backdropFilter = 'none'
    element.style.maxWidth = 'none'
    element.style.margin = '0'
    element.style.boxShadow = 'none'

    // 清理所有子元素的样式
    const allElements = element.querySelectorAll('*')
    allElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.classList.remove('backdrop-blur-sm')
        el.style.backdropFilter = 'none'
        ;(el.style as any).webkitBackdropFilter = 'none'
        
        // 确保背景透明度正确显示
        if (el.style.backgroundColor?.includes('rgba')) {
          el.style.backgroundColor = el.style.backgroundColor.replace(/rgba\([^)]+\)/, 'rgb(255, 255, 255)')
        }
      }
    })
  }

  // 生成Canvas图片
  const generateCanvas = async (format: 'image' | 'pdf'): Promise<HTMLCanvasElement> => {
    if (!reportRef.current) {
      throw new Error('Report reference not found')
    }

    await new Promise(resolve => setTimeout(resolve, 300))

    const backgroundColor = format === 'pdf' ? '#ffffff' : '#fdf2f8'
    const tempContainer = createTempContainer(backgroundColor)
    
    try {
      // 克隆报告内容
      const clonedReport = reportRef.current.cloneNode(true) as HTMLElement
      cleanClonedElement(clonedReport)
      
      tempContainer.appendChild(clonedReport)
      document.body.appendChild(tempContainer)

      const canvas = await html2canvas(tempContainer, {
        scale: format === 'pdf' ? 1.5 : 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor,
        width: 800,
        height: tempContainer.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        logging: false
      })

      return canvas
    } finally {
      // 确保临时容器被清理
      if (document.body.contains(tempContainer)) {
        document.body.removeChild(tempContainer)
      }
    }
  }

  // 生成备用Canvas（简化配置）
  const generateFallbackCanvas = async (format: 'image' | 'pdf'): Promise<HTMLCanvasElement> => {
    if (!reportRef.current) {
      throw new Error('Report reference not found')
    }

    const backgroundColor = format === 'pdf' ? '#ffffff' : '#fdf2f8'
    return await html2canvas(reportRef.current, {
      scale: 1,
      backgroundColor,
      logging: false,
      useCORS: false,
      allowTaint: true,
      width: 800,
      height: reportRef.current.scrollHeight
    })
  }

  // 下载文本文件
  const downloadTextFile = (): void => {
    const reportContent = generateReportText(data)
    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "梦幻问卷调查报告.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // 下载图片文件
  const downloadImageFile = (canvas: HTMLCanvasElement): void => {
    const link = document.createElement('a')
    link.download = '梦幻问卷调查报告.png'
    link.href = canvas.toDataURL('image/png', 1.0)
    link.click()
  }

  // 下载PDF文件
  const downloadPdfFile = (canvas: HTMLCanvasElement): void => {
    const imgData = canvas.toDataURL('image/png', 1.0)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0
    
    // 添加第一页
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
    heightLeft -= pageHeight
    
    // 如果内容超过一页，添加更多页面
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
      heightLeft -= pageHeight
    }
    
    pdf.save('梦幻问卷调查报告.pdf')
  }

  // 主下载处理函数
  const handleDownload = async (format: 'text' | 'image' | 'pdf') => {
    setIsDownloading(true)
    
    try {
      if (format === 'text') {
        downloadTextFile()
      } else {
        let canvas: HTMLCanvasElement
        
        try {
          canvas = await generateCanvas(format)
        } catch (canvasError) {
          console.error('Primary canvas generation failed:', canvasError)
          canvas = await generateFallbackCanvas(format)
        }
        
        if (format === 'image') {
          downloadImageFile(canvas)
        } else {
          downloadPdfFile(canvas)
        }
      }
      
      setIsDownloadDialogOpen(false)
      
    } catch (error) {
      console.error('Download failed:', error)
      alert('下载失败，请稍后重试。')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleEmailSend = async () => {
    setIsEmailSending(true)
    
    try {
      const reportContent = generateReportText(data)
      
      // 对于 mailto 方式，我们仍然需要知道收件人邮箱
      // 但对于 API 方式，我们让服务器端处理
      let recipientEmail = ""
      if (emailForm.sendMethod === "mailto") {
        if (emailForm.recipientType === "contributor") {
          // 对于 mailto，如果没有配置 NEXT_PUBLIC_CONTRIBUTOR_EMAIL，提示用户
          alert("贡献者邮箱未配置，请选择自定义收件人或使用API发送方式。💕")
          return
        } else {
          recipientEmail = emailForm.recipientEmail
        }
      }

      const emailSubject = `💕 ${data.name || "匿名用户"}的梦幻问卷调查报告分享`
      let emailBody = `
${emailForm.customMessage ? emailForm.customMessage + "\n\n" : ""}
${reportContent}

---
此报告由梦幻问卷调查应用生成 ✨
      `.trim()

      // 默认包含长图，生成图片
      let imageDataUrl = ""
      try {
        const canvas = await generateCanvas('image')
        imageDataUrl = canvas.toDataURL('image/png', 0.8) // 压缩图片以适应邮件
        emailBody += "\n\n📸 报告长图已生成，请查看附件。"
      } catch (error) {
        console.error('Failed to generate image for email:', error)
        emailBody += "\n\n⚠️ 图片生成失败，仅包含文本内容。"
      }

      if (emailForm.sendMethod === "mailto") {
        // 方案1: 使用 mailto 链接
        let mailtoLink = ""
        
        if (emailForm.emailClient === "outlook") {
          mailtoLink = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(recipientEmail)}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
          window.open(mailtoLink, '_blank')
        } else if (emailForm.emailClient === "gmail") {
          mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
          window.open(mailtoLink, '_blank')
        } else if (emailForm.emailClient === "yahoo") {
          mailtoLink = `https://compose.mail.yahoo.com/?to=${encodeURIComponent(recipientEmail)}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
          window.open(mailtoLink, '_blank')
        } else {
          mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
          window.open(mailtoLink, '_blank')
        }
        
        // 如果包含图片，提示用户手动添加附件
        if (imageDataUrl) {
          // 自动下载图片供用户手动添加
          const link = document.createElement('a')
          link.download = '梦幻问卷调查报告_邮件附件.png'
          link.href = imageDataUrl
          link.click()
          
          setTimeout(() => {
            alert('邮件客户端已打开！\n\n📎 报告长图已自动下载，请手动添加为邮件附件。💕')
          }, 500)
        } else {
          const clientName = emailForm.emailClient === "default" ? "默认邮件应用" : 
                            emailForm.emailClient === "outlook" ? "Outlook" :
                            emailForm.emailClient === "gmail" ? "Gmail" :
                            emailForm.emailClient === "yahoo" ? "Yahoo Mail" : "邮件客户端"
          
          alert(`已打开${clientName}！请检查您的邮件应用。💕`)
        }
        
      } else if (emailForm.sendMethod === "api") {
        // 方案2: 使用 Vercel API 路由 + Resend
        try {
          const emailData: any = {
            subject: emailSubject,
            content: emailBody,
            customMessage: emailForm.customMessage,
            recipientType: emailForm.recipientType
          }

          // 只有在自定义收件人时才发送 to 字段
          if (emailForm.recipientType === "custom") {
            emailData.to = emailForm.recipientEmail
          }

          // 如果包含图片，添加到请求数据中
          if (imageDataUrl) {
            emailData.imageAttachment = {
              filename: '梦幻问卷调查报告.png',
              content: imageDataUrl.split(',')[1], // 移除data:image/png;base64,前缀
              contentType: 'image/png'
            }
          }

          console.log('Sending email via API...')

          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
          })

          const responseData = await response.json()
          console.log('API Response:', responseData)

          if (!response.ok) {
            // 显示详细的错误信息
            const errorMessage = responseData.details || responseData.error || 'Unknown API error'
            console.error('API Error Details:', responseData)
            
            // 根据错误类型提供不同的提示
            if (response.status === 503) {
              alert(`邮件服务配置错误：${errorMessage}\n\n请检查环境变量配置，或使用邮件客户端发送方式。💕`)
            } else if (response.status === 400) {
              alert(`请求参数错误：${errorMessage}\n\n请检查邮箱地址格式是否正确。💕`)
            } else {
              alert(`API发送失败：${errorMessage}\n\n将为您打开邮件客户端作为备选方案。💕`)
            }
            
            throw new Error(`API Error: ${errorMessage}`)
          }

          alert(`邮件发送成功！💕\n\n${responseData.hasAttachment ? '📎 已包含报告长图附件' : '📄 已发送文本报告'}`)
          
        } catch (apiError) {
          console.error("API send failed:", apiError)
          
          const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown error'
          
          // 只有在非配置错误时才回退到 mailto 方式
          if (!errorMessage.includes('邮件服务配置错误')) {
            // 回退到 mailto 方式 - 但需要收件人邮箱
            if (emailForm.recipientType === "contributor") {
              alert("API发送失败且贡献者邮箱未在客户端配置，请使用自定义收件人重试。💕")
              return
            }
            
            const mailtoLink = `mailto:${emailForm.recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
            window.open(mailtoLink, '_blank')
            
            if (imageDataUrl) {
              const link = document.createElement('a')
              link.download = '梦幻问卷调查报告_邮件附件.png'
              link.href = imageDataUrl
              link.click()
              
              setTimeout(() => {
                alert("已为您打开邮件客户端作为备选方案！\n\n📎 报告长图已下载，请手动添加为附件。💕")
              }, 500)
            } else {
              setTimeout(() => {
                alert("已为您打开邮件客户端作为备选方案！💕")
              }, 500)
            }
          }
        }
      }
      
      // 重置表单
      setEmailForm({
        recipientEmail: "",
        recipientType: "contributor",
        sendMethod: "api",
        customMessage: "",
        emailClient: "default"
      })
      setIsEmailDialogOpen(false)
      
    } catch (error) {
      console.error("Email sending failed:", error)
      alert("邮件发送失败，请稍后重试。")
    } finally {
      setIsEmailSending(false)
    }
  }

  const sectionConfigs = [
    {
      title: "基本信息",
      icon: Heart,
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-gradient-to-r from-pink-50 to-rose-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-800",
    },
    {
      title: "外貌特征",
      icon: Flower,
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-gradient-to-r from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-800",
    },
    {
      title: "性格与心理",
      icon: Sparkles,
      color: "from-violet-400 to-purple-400",
      bgColor: "bg-gradient-to-r from-violet-50 to-purple-50",
      borderColor: "border-violet-200",
      textColor: "text-violet-800",
    },
    {
      title: "生活偏好",
      icon: Star,
      color: "from-rose-400 to-pink-400",
      bgColor: "bg-gradient-to-r from-rose-50 to-pink-50",
      borderColor: "border-rose-200",
      textColor: "text-rose-800",
    },
    {
      title: "兴趣爱好",
      icon: Crown,
      color: "from-fuchsia-400 to-pink-400",
      bgColor: "bg-gradient-to-r from-fuchsia-50 to-pink-50",
      borderColor: "border-fuchsia-200",
      textColor: "text-fuchsia-800",
    },
    {
      title: "生活习惯",
      icon: Heart,
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-gradient-to-r from-pink-50 to-rose-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-800",
    },
    {
      title: "详细特征",
      icon: Sparkles,
      color: "from-indigo-400 to-purple-400",
      bgColor: "bg-gradient-to-r from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-800",
    },
    {
      title: "个人想法",
      icon: Sparkles,
      color: "from-purple-400 to-fuchsia-400",
      bgColor: "bg-gradient-to-r from-purple-50 to-fuchsia-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-800",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-rose-50 to-fuchsia-100 p-4 relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" data-html2canvas-ignore>
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200/30 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-32 right-20 w-16 h-16 bg-purple-200/30 rounded-full blur-lg animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-rose-200/30 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/3 w-12 h-12 bg-fuchsia-200/30 rounded-full blur-lg animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-violet-200/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-pink-200 hover:bg-pink-50 text-pink-700 shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            返回
          </Button>
          <div className="flex gap-3">
            <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Mail className="h-4 w-4" />
                  发送邮件给爱你的人
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button
              variant="outline"
              onClick={() => setIsDownloadDialogOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white border-none hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="h-4 w-4" />
              下载报告
            </Button>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden" ref={reportRef}>
          <CardHeader className="bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 text-white relative">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <Crown className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <Sparkles className="h-8 w-8" />
                梦幻问卷调查报告
                <Sparkles className="h-8 w-8" />
              </CardTitle>
              <CardDescription className="text-pink-100 text-lg">
                ✨ 生成时间: {new Date().toLocaleString("zh-CN")} ✨
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-10">
            {/* 数据安全提醒 */}
            <div className="flex items-center justify-center gap-2 -mt-2 mb-8" data-html2canvas-ignore>
              <div className="h-px bg-pink-200 flex-1 max-w-20"></div>
              <div className="text-xs text-pink-400 px-4 py-2 bg-pink-50/50 rounded-full border border-pink-100/50 backdrop-blur-sm flex items-center gap-2">
                <span className="text-pink-500">🔒</span>
                <span>您的数据安全：此报告仅在您的浏览器中生成，服务器不会保存任何个人信息</span>
              </div>
              <div className="h-px bg-pink-200 flex-1 max-w-20"></div>
            </div>

            {/* 基本信息 */}
            <section
              className={`${sectionConfigs[0].bgColor} p-6 rounded-2xl border-2 ${sectionConfigs[0].borderColor} shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`bg-gradient-to-r ${sectionConfigs[0].color} p-3 rounded-full shadow-lg`}>
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${sectionConfigs[0].textColor}`}>💕 基本信息</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: "称呼", value: data.name, icon: "👤" },
                  { label: "年龄", value: data.age, icon: "🎂" },
                  { label: "身高", value: data.height ? `${data.height}cm` : "", icon: "📏" },
                  { label: "血型", value: data.bloodType, icon: "🩸" },
                  { label: "生日", value: data.birthday, icon: "🎉" },
                  { label: "体型", value: data.bodyType, icon: "👤" },
                  { label: "发质", value: data.hairTexture, icon: "👩‍🦲" },
                  { label: "皮肤", value: data.skinColor, icon: "🌟" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/60 p-4 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-pink-600 font-medium">{item.label}:</span>
                    </div>
                    <p className="font-semibold text-pink-800 text-lg">{item.value || "未填写"}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-gradient-to-r from-pink-200 via-purple-200 to-rose-200 h-1 rounded-full" />

            {/* 外貌特征 */}
            <section
              className={`${sectionConfigs[1].bgColor} p-6 rounded-2xl border-2 ${sectionConfigs[1].borderColor} shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`bg-gradient-to-r ${sectionConfigs[1].color} p-3 rounded-full shadow-lg`}>
                  <Flower className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${sectionConfigs[1].textColor}`}>🌸 外貌特征</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "发型", value: data.hairLength, icon: "✂️" },
                  { label: "发色", value: data.hairColor, icon: "🎨" },
                  { label: "肤色", value: data.skinTone, icon: "🌟" },
                  { label: "指甲偏好", value: data.nailPreference, icon: "💅" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-purple-600 font-medium">{item.label}:</span>
                    </div>
                    <p className="font-semibold text-purple-800 text-lg">{item.value || "未填写"}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-gradient-to-r from-purple-200 via-pink-200 to-violet-200 h-1 rounded-full" />

            {/* 性格与心理 */}
            <section
              className={`${sectionConfigs[2].bgColor} p-6 rounded-2xl border-2 ${sectionConfigs[2].borderColor} shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`bg-gradient-to-r ${sectionConfigs[2].color} p-3 rounded-full shadow-lg`}>
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${sectionConfigs[2].textColor}`}>💜 性格与心理</h3>
              </div>
              <div className="space-y-6">
                <div className="bg-white/60 p-4 rounded-xl border border-violet-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🧠</span>
                    <span className="text-sm text-violet-600 font-medium">MBTI:</span>
                  </div>
                  <p className="font-semibold text-violet-800 text-lg">{data.mbti || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-violet-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">✨</span>
                    <span className="text-sm text-violet-600 font-medium">人格类型:</span>
                  </div>
                  <p className="text-violet-700 leading-relaxed">{data.personalityType || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-violet-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">✨</span>
                    <span className="text-sm text-violet-600 font-medium">性格特点:</span>
                  </div>
                  <p className="text-violet-700 leading-relaxed">{data.personality || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-violet-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🤔</span>
                    <span className="text-sm text-violet-600 font-medium">缺点:</span>
                  </div>
                  <p className="text-violet-700 leading-relaxed">{data.weaknesses || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-violet-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💕</span>
                    <span className="text-sm text-violet-600 font-medium">情史:</span>
                  </div>
                  <p className="text-violet-700 leading-relaxed">{data.loveHistory || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-violet-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📖</span>
                    <span className="text-sm text-violet-600 font-medium">过去:</span>
                  </div>
                  <p className="text-violet-700 leading-relaxed">{data.pastExperience || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-violet-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🏠</span>
                    <span className="text-sm text-violet-600 font-medium">家庭:</span>
                  </div>
                  <p className="text-violet-700 leading-relaxed">{data.family || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-violet-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💖</span>
                    <span className="text-sm text-violet-600 font-medium">喜欢的伴侣类型:</span>
                  </div>
                  <p className="text-violet-700 leading-relaxed">{data.partnerType || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-violet-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">👥</span>
                    <span className="text-sm text-violet-600 font-medium">社交偏好:</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-violet-400 to-purple-400 text-white text-base px-4 py-1">
                    {data.socialPreference || "未填写"}
                  </Badge>
                </div>
              </div>
            </section>

            <Separator className="bg-gradient-to-r from-violet-200 via-rose-200 to-pink-200 h-1 rounded-full" />

            {/* 生活偏好 */}
            <section
              className={`${sectionConfigs[3].bgColor} p-6 rounded-2xl border-2 ${sectionConfigs[3].borderColor} shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`bg-gradient-to-r ${sectionConfigs[3].color} p-3 rounded-full shadow-lg`}>
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${sectionConfigs[3].textColor}`}>🎀 生活偏好</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "饮食", value: data.dietPreference, icon: "🍽️", gradient: "from-rose-400 to-pink-400" },
                  { label: "天气", value: data.weatherPreference, icon: "🌤️", gradient: "from-pink-400 to-rose-400" },
                  { label: "时间", value: data.timePreference, icon: "⏰", gradient: "from-rose-400 to-red-400" },
                  { label: "口味", value: data.tastePreference, icon: "😋", gradient: "from-pink-400 to-rose-400" },
                  { label: "饮品", value: data.drinkPreference, icon: "🧋", gradient: "from-rose-400 to-pink-400" },
                  { label: "奶制品", value: data.milkPreference, icon: "🥛", gradient: "from-rose-400 to-pink-400" },
                  { label: "运动", value: data.exercisePreference, icon: "🏃‍♀️", gradient: "from-pink-400 to-red-400" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/60 p-4 rounded-xl border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-rose-600 font-medium">{item.label}:</span>
                    </div>
                    <Badge className={`bg-gradient-to-r ${item.gradient} text-white text-sm px-3 py-1`}>
                      {item.value || "未填写"}
                    </Badge>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-gradient-to-r from-rose-200 via-fuchsia-200 to-pink-200 h-1 rounded-full" />

            {/* 兴趣爱好 */}
            <section
              className={`${sectionConfigs[4].bgColor} p-6 rounded-2xl border-2 ${sectionConfigs[4].borderColor} shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`bg-gradient-to-r ${sectionConfigs[4].color} p-3 rounded-full shadow-lg`}>
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${sectionConfigs[4].textColor}`}>🌺 兴趣爱好</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "喜欢的颜色", value: data.favoriteColors, icon: "🎨" },
                  { label: "喜欢的穿搭", value: data.favoriteStyle, icon: "👗" },
                  { label: "喜欢的风格", value: data.favoriteStyleType, icon: "🎨" },
                  { label: "喜欢的音乐", value: data.favoriteMusic, icon: "🎵" },
                  { label: "喜欢的歌曲", value: data.favoriteSongs, icon: "🎶" },
                  { label: "喜欢的歌手", value: data.favoriteSingers, icon: "👩‍🎤" },
                  { label: "喜欢的照片", value: data.favoritePhotos, icon: "📸" },
                  { label: "喜欢的电影", value: data.favoriteMovies, icon: "🎥" },
                  { label: "喜欢的动漫", value: data.favoriteAnime, icon: "🎞️" },
                  { label: "喜欢的角色", value: data.favoriteCharacters, icon: "👤" },
                  { label: "喜欢的IP", value: data.favoriteIP, icon: "🌐" },
                  { label: "喜欢的博主", value: data.favoriteBloggers, icon: "👨‍💻" },
                  { label: "喜欢的爱豆", value: data.favoriteIdols, icon: "👩‍🎤" },
                  { label: "喜欢的书籍", value: data.favoriteBooks, icon: "📚" },
                  { label: "喜欢的作家", value: data.favoriteAuthors, icon: "👩‍🎤" },
                  { label: "喜欢的季节", value: data.favoriteSeason, icon: "🌸" },
                  { label: "喜欢的天气", value: data.favoriteWeather, icon: "🌤️" },
                  { label: "喜欢的城市", value: data.favoriteCity, icon: "🏙️" },
                  { label: "喜欢的国家", value: data.favoriteCountry, icon: "🇨🇳" },
                  { label: "喜欢的花", value: data.favoriteFlowers, icon: "🌸" },
                  { label: "喜欢的语种", value: data.favoriteLanguages, icon: "🌐" },
                  { label: "喜欢的小动物", value: data.favoriteAnimals, icon: "🐾" },
                  { label: "喜欢的菜式", value: data.favoriteCuisine, icon: "🍽️" },
                  { label: "喜欢的食物", value: data.favoriteFood, icon: "🍴" },
                  { label: "喜欢的风景", value: data.favoriteScenery, icon: "🌄" },
                  { label: "喜欢的文化", value: data.favoriteCulture, icon: "🎨" },
                  { label: "喜欢的朋友", value: data.favoriteFriends, icon: "👫" },
                  { label: "喜欢的拍照姿势", value: data.favoritePhotoStyle, icon: "📸" },
                  { label: "喜欢的运动方式", value: data.favoriteExercise, icon: "🏃‍♀️" },
                  { label: "消遣方式", value: data.leisureActivities ? data.leisureActivities.join(", ") : "", icon: "🌟" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/60 p-4 rounded-xl border border-fuchsia-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-fuchsia-600 font-medium">{item.label}:</span>
                    </div>
                    <p className="font-semibold text-fuchsia-800 text-lg">{item.value || "未填写"}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-gradient-to-r from-fuchsia-200 via-pink-200 to-rose-200 h-1 rounded-full" />

            {/* 生活习惯 */}
            <section
              className={`${sectionConfigs[5].bgColor} p-6 rounded-2xl border-2 ${sectionConfigs[5].borderColor} shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`bg-gradient-to-r ${sectionConfigs[5].color} p-3 rounded-full shadow-lg`}>
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${sectionConfigs[5].textColor}`}>🎈 生活习惯</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "输入法偏好", value: data.inputMethod, icon: "⌨️" },
                  { label: "食物质地偏好", value: data.foodTexture, icon: "🍲" },
                  { label: "睡眠习惯", value: data.sleepHabits, icon: "💤" },
                  { label: "小癖好", value: data.quirks, icon: "🌟" },
                  { label: "过敏原", value: data.allergies || "无", icon: "🚫" },
                  { label: "香水偏好", value: data.perfumePreference, icon: "🌸" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/60 p-4 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-pink-600 font-medium">{item.label}:</span>
                    </div>
                    <p className="font-semibold text-pink-800 text-lg">{item.value || "未填写"}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-gradient-to-r from-pink-200 via-purple-200 to-fuchsia-200 h-1 rounded-full" />

            {/* 详细特征 */}
            <section
              className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-indigo-400 to-purple-400 p-3 rounded-full shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-indigo-800">✨ 详细特征</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "会不会做饭", value: data.canCook, icon: "👩‍🍳" },
                    { label: "会不会挑食", value: data.isPicky, icon: "🥗" },
                    { label: "好不好骗", value: data.isGullible, icon: "🤔" },
                    { label: "会不会抽烟", value: data.smoking, icon: "🚭" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm text-indigo-600 font-medium">{item.label}:</span>
                      </div>
                      <Badge className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-sm px-3 py-1">
                        {item.value || "未填写"}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🎭</span>
                    <span className="text-sm text-indigo-600 font-medium">属性娃娃的舞台妆造:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.dollMakeup || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🥺</span>
                    <span className="text-sm text-indigo-600 font-medium">撒娇是什么样子:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.actingCute || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">😴</span>
                    <span className="text-sm text-indigo-600 font-medium">睡眠质量:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.sleepQuality || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🛏️</span>
                    <span className="text-sm text-indigo-600 font-medium">睡觉会不会踢被子:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.kickBlanket || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💤</span>
                    <span className="text-sm text-indigo-600 font-medium">睡觉喜欢什么姿势:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.sleepPosition || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">⚡</span>
                    <span className="text-sm text-indigo-600 font-medium">为什么每天精力旺盛:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.energySource || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🍷</span>
                    <span className="text-sm text-indigo-600 font-medium">酒量:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.alcoholTolerance || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🎲</span>
                    <span className="text-sm text-indigo-600 font-medium">无聊的时候会做些什么:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.boredActivities || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🌑</span>
                    <span className="text-sm text-indigo-600 font-medium">阴暗面:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.darkSide || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🍺</span>
                    <span className="text-sm text-indigo-600 font-medium">喝醉之后会耍什么酒疯:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.drunkBehavior || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🎁</span>
                    <span className="text-sm text-indigo-600 font-medium">喜欢收到什么样的礼物:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.giftPreference || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">😠</span>
                    <span className="text-sm text-indigo-600 font-medium">生气的时候会是什么样子:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.angerStyle || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🎬</span>
                    <span className="text-sm text-indigo-600 font-medium">喜欢看什么类型的小电影:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.movieType || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💕</span>
                    <span className="text-sm text-indigo-600 font-medium">喜欢以什么样的方式调情:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.flirtingStyle || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🤝</span>
                    <span className="text-sm text-indigo-600 font-medium">吵架的时候会以什么方式解决:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.conflictResolution || "未填写"}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🤨</span>
                    <span className="text-sm text-indigo-600 font-medium">为什么眉毛有一边只有一半:</span>
                  </div>
                  <p className="text-indigo-700 leading-relaxed">{data.eyebrowStory || "未填写"}</p>
                </div>
              </div>
            </section>

            <Separator className="bg-gradient-to-r from-indigo-200 via-purple-200 to-fuchsia-200 h-1 rounded-full" />

            {/* 个人想法 */}
            <section
              className={`${sectionConfigs[6].bgColor} p-6 rounded-2xl border-2 ${sectionConfigs[6].borderColor} shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`bg-gradient-to-r ${sectionConfigs[6].color} p-3 rounded-full shadow-lg`}>
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${sectionConfigs[6].textColor}`}>💖 个人想法</h3>
              </div>
              <div className="space-y-6">
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🌟</span>
                    <span className="text-sm text-purple-600 font-medium">未来规划:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.lifeGoals || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🌈</span>
                    <span className="text-sm text-purple-600 font-medium">三观:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.values || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🎂</span>
                    <span className="text-sm text-purple-600 font-medium">生日愿望:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.birthdayWish || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💡</span>
                    <span className="text-sm text-purple-600 font-medium">奇怪想法:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.randomThoughts || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🙅‍♀️</span>
                    <span className="text-sm text-purple-600 font-medium">反感事物（总体）:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.dislikes || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🙅‍♀️</span>
                    <span className="text-sm text-purple-600 font-medium">反感的食物:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.dislikedFood || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🙅‍♀️</span>
                    <span className="text-sm text-purple-600 font-medium">反感的人:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.dislikedPeople || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🙅‍♀️</span>
                    <span className="text-sm text-purple-600 font-medium">反感的行为:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.dislikedBehavior || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🙅‍♀️</span>
                    <span className="text-sm text-purple-600 font-medium">反感的类型:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.dislikedType || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🙅‍♀️</span>
                    <span className="text-sm text-purple-600 font-medium">反感的规矩:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.dislikedRules || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🙅‍♀️</span>
                    <span className="text-sm text-purple-600 font-medium">反感的圈子:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.dislikedCircles || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🙅‍♀️</span>
                    <span className="text-sm text-purple-600 font-medium">为什么会反感:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.dislikeReasons || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🙅‍♀️</span>
                    <span className="text-sm text-purple-600 font-medium">恋爱类型偏好:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.loveType || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🙅‍♀️</span>
                    <span className="text-sm text-purple-600 font-medium">恋爱节奏偏好:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.relationshipStyle || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🙅‍♀️</span>
                    <span className="text-sm text-purple-600 font-medium">对快餐式恋爱的态度:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.fastLoveAttitude || "未填写"}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💭</span>
                    <span className="text-sm text-purple-600 font-medium">内心想法:</span>
                  </div>
                  <p className="text-purple-700 leading-relaxed">{data.deepThoughts || "未填写"}</p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        {/* Email Dialog */}
        <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
          <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-pink-200">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-pink-800 flex items-center gap-2">
                <Mail className="h-6 w-6" />
                💕 发送梦幻报告
              </DialogTitle>
              <DialogDescription className="text-pink-600">
                选择收件人和发送方式
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <Label className="text-pink-700 font-medium">收件人</Label>
                <RadioGroup
                  value={emailForm.recipientType}
                  onValueChange={(value) => setEmailForm(prev => ({ ...prev, recipientType: value }))}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="contributor" id="contributor" />
                    <Label htmlFor="contributor" className="text-pink-600">👨‍💻 发送给项目贡献者 (推荐)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="text-pink-600">💕 发送给其他人</Label>
                  </div>
                </RadioGroup>
              </div>

              {emailForm.recipientType === "contributor" && (
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <p className="text-xs text-pink-600 mt-1">
                    📧 感谢您向项目贡献者分享您的问卷结果！
                  </p>
                </div>
              )}

              {emailForm.recipientType === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="custom-email" className="text-pink-700 font-medium">
                    收件人邮箱 *
                  </Label>
                  <Input
                    id="custom-email"
                    type="email"
                    placeholder="输入收件人邮箱地址"
                    value={emailForm.recipientEmail}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, recipientEmail: e.target.value }))}
                    className="border-pink-200 focus:border-pink-400"
                    required
                  />
                </div>
              )}

              <div className="space-y-3">
                <Label className="text-pink-700 font-medium">发送方式</Label>
                <RadioGroup
                  value={emailForm.sendMethod}
                  onValueChange={(value) => setEmailForm(prev => ({ ...prev, sendMethod: value }))}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="api" id="api" />
                    <Label htmlFor="api" className="text-pink-600">🚀 服务器直接发送 (Vercel)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mailto" id="mailto" />
                    <Label htmlFor="mailto" className="text-pink-600">📧 邮件客户端发送</Label>
                  </div>
                </RadioGroup>
              </div>

              <Alert className="border-pink-200 bg-pink-50">
                <Info className="h-4 w-4 text-pink-600" />
                <AlertDescription className="text-pink-700">
                  {emailForm.sendMethod === "mailto" 
                    ? "🔥 最可靠方式：打开您的邮件应用，内容自动填充，您只需点击发送。"
                    : "⚡ 服务器发送：使用 Vercel API + Resend 服务直接发送，速度快且可靠。"
                  }
                </AlertDescription>
              </Alert>

              {emailForm.sendMethod === "mailto" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-pink-700 font-medium">选择邮件客户端</Label>
                    <RadioGroup
                      value={emailForm.emailClient}
                      onValueChange={(value) => setEmailForm(prev => ({ ...prev, emailClient: value }))}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="default" />
                        <Label htmlFor="default" className="text-pink-600">🖥️ 系统默认</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outlook" id="outlook" />
                        <Label htmlFor="outlook" className="text-pink-600">📧 Outlook</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gmail" id="gmail" />
                        <Label htmlFor="gmail" className="text-pink-600">📮 Gmail</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yahoo" id="yahoo" />
                        <Label htmlFor="yahoo" className="text-pink-600">📬 Yahoo</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-700">
                      {emailForm.emailClient === "default" 
                        ? "将使用您系统的默认邮件应用（如 Mail、Outlook 桌面版等）"
                        : emailForm.emailClient === "outlook"
                        ? "将打开 Outlook 网页版，如果您已登录会自动填充内容"
                        : emailForm.emailClient === "gmail"
                        ? "将打开 Gmail 网页版，需要您已登录 Google 账户"
                        : "将打开 Yahoo Mail 网页版，需要您已登录 Yahoo 账户"
                      }
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message" className="text-pink-700 font-medium">
                  自定义消息 (可选)
                </Label>
                <Textarea
                  id="message"
                  placeholder="添加一些个人消息..."
                  value={emailForm.customMessage}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, customMessage: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400 min-h-[80px]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsEmailDialogOpen(false)}
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                取消
              </Button>
              <Button
                onClick={handleEmailSend}
                disabled={isEmailSending || (emailForm.recipientType === "custom" && !emailForm.recipientEmail)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg"
              >
                {isEmailSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    发送中...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    发送邮件
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Download Dialog */}
        <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
          <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-pink-200">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-pink-800 flex items-center gap-2">
                <Download className="h-6 w-6" />
                💕 下载梦幻报告
              </DialogTitle>
              <DialogDescription className="text-pink-600">
                选择您喜欢的下载格式
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <Button
                  onClick={() => handleDownload('text')}
                  disabled={isDownloading}
                  className="flex items-center justify-start gap-3 h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                >
                  <FileText className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">📄 文本格式 (.txt)</div>
                    <div className="text-sm opacity-90">纯文本格式，兼容性最好</div>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handleDownload('image')}
                  disabled={isDownloading}
                  className="flex items-center justify-start gap-3 h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
                >
                  <Image className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">🖼️ 长图格式 (.png)</div>
                    <div className="text-sm opacity-90">高清长图，适合分享和保存</div>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handleDownload('pdf')}
                  disabled={isDownloading}
                  className="flex items-center justify-start gap-3 h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
                >
                  <FileDown className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">📑 PDF格式 (.pdf)</div>
                    <div className="text-sm opacity-90">专业文档格式，适合打印</div>
                  </div>
                </Button>
              </div>
              
              {isDownloading && (
                <Alert className="border-pink-200 bg-pink-50">
                  <Info className="h-4 w-4 text-pink-600" />
                  <AlertDescription className="text-pink-700">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-600"></div>
                      正在生成报告，请稍候...
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setIsDownloadDialogOpen(false)}
                disabled={isDownloading}
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                取消
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
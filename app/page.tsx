"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { QuestionnaireForm } from "@/components/questionnaire-form"
import { ReportView } from "@/components/report-view"
import { GitHubButton } from "@/components/github-button"
import type { FormData } from "@/types/questionnaire"
import { Crown, Sparkles, Heart } from "lucide-react"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showReport, setShowReport] = useState(false)

  const handleStepComplete = (stepData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
    setCurrentStep((prev) => prev + 1)
  }

  const handleSubmit = (finalData: FormData) => {
    setFormData(finalData)
    setIsSubmitted(true)
    // Here you would typically send the data to your backend
    console.log("Submitted data:", finalData)
  }

  const handleViewReport = () => {
    setShowReport(true)
  }

  if (showReport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-rose-50 to-fuchsia-100 p-4 relative overflow-hidden">
        {/* GitHub按钮 - 移动端友好位置 */}
        <div className="fixed top-4 right-4 z-[100] xl:top-6 xl:right-6">
          <GitHubButton />
        </div>
        
        <ReportView data={formData} onBack={() => setShowReport(false)} />
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-rose-50 to-fuchsia-100 p-4 relative overflow-hidden">
        {/* GitHub按钮 - 移动端友好位置 */}
        <div className="fixed top-4 right-4 z-[100] xl:top-6 xl:right-6">
          <GitHubButton />
        </div>

        {/* 装饰性背景元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        </div>

        <div className="max-w-2xl mx-auto pt-20 relative z-10">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 text-white relative">
              <div className="absolute inset-0 bg-white/10"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Crown className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl text-white flex items-center justify-center gap-2">
                  <Sparkles className="h-8 w-8" />
                  回答完成！
                  <Sparkles className="h-8 w-8" />
                </CardTitle>
                <CardDescription className="text-pink-100 text-lg">
                  紫啧完成梦幻问卷调查啦！来回顾一下你的回答吧！
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-6 p-8">
              <p className="text-pink-600 text-lg">回顾你的详细回答报告并分享给你的朋友吧！</p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleViewReport}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  查看我的梦幻回答
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-pink-200 text-pink-600 hover:bg-pink-50 shadow-md"
                >
                  重新填写
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-rose-50 to-fuchsia-100 p-4 relative overflow-hidden">
      {/* GitHub按钮 - 移动端友好位置 */}
      <div className="fixed top-4 right-4 z-[100] xl:top-6 xl:right-6">
        <GitHubButton />
      </div>

      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 pt-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-4 rounded-full shadow-lg">
              <Crown className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-pink-800 mb-4 flex items-center justify-center gap-3">
            <Sparkles className="h-12 w-12 text-pink-600" />
            梦幻好奇紫啧问卷调查
            <Sparkles className="h-12 w-12 text-pink-600" />
          </h1>
          <p className="text-xl text-pink-600 mb-6">✨ 让我来更好地了解紫啧你吧！请诚实地回答哦💋 ✨</p>
          
          {/* 数据安全提醒 */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px bg-pink-200 flex-1 max-w-16"></div>
            <p className="text-xs text-pink-400 px-3 py-1 bg-pink-50/50 rounded-full border border-pink-100/50 backdrop-blur-sm">
              🔒 您的数据安全：此报告仅在您的浏览器中生成，服务器不会保存任何个人信息
            </p>
            <div className="h-px bg-pink-200 flex-1 max-w-16"></div>
          </div>

          <div className="max-w-md mx-auto mb-4">
            <Progress
              value={(currentStep / 8) * 100}
              className="w-full h-3 bg-pink-100 border border-pink-200 shadow-inner"
            />
            <style jsx>{`
              .progress-indicator {
                background: linear-gradient(to right, #ec4899, #f43f5e, #ec4899);
              }
            `}</style>
          </div>
          <p className="text-sm text-pink-500 font-medium">第 {currentStep + 1} 步，共 8 步</p>
        </div>

        <QuestionnaireForm
          currentStep={currentStep}
          formData={formData}
          onStepComplete={handleStepComplete}
          onSubmit={handleSubmit}
          onPrevious={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
        />
      </div>
    </div>
  )
}

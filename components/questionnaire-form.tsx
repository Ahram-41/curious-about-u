"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FormData } from "@/types/questionnaire"
import { ChevronLeft, ChevronRight, Heart, Flower, Sparkles, Star, Palette, Brain } from "lucide-react"

interface QuestionnaireFormProps {
  currentStep: number
  formData: FormData
  onStepComplete: (data: Partial<FormData>) => void
  onSubmit: (data: FormData) => void
  onPrevious: () => void
}

export function QuestionnaireForm({
  currentStep,
  formData,
  onStepComplete,
  onSubmit,
  onPrevious,
}: QuestionnaireFormProps) {
  const [stepData, setStepData] = useState<any>({})

  const handleNext = () => {
    onStepComplete(stepData)
    setStepData({})
  }

  const handleFinalSubmit = async () => {
    const finalData = { ...formData, ...stepData }
    
    // 移除自动发送邮件功能 - 用户可以在报告页面手动发送邮件
    // 这样避免了重复发送邮件的问题
    console.log('问卷提交完成:', finalData.name || "匿名用户")
    
    // 继续原有的提交流程
    onSubmit(finalData)
  }

  const updateStepData = (key: string, value: any) => {
    setStepData((prev: any) => ({ ...prev, [key]: value }))
  }

  const steps = [
    {
      title: "基本信息",
      description: "告诉我们一些关于您的基本信息",
      icon: Heart,
      color: "from-pink-400 to-rose-400",
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-pink-700 font-medium">
              怎么称呼您 👋
            </Label>
            <Input
              id="name"
              placeholder="请输入您的称呼"
              value={stepData.name || formData.name || ""}
              onChange={(e) => updateStepData("name", e.target.value)}
              className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age" className="text-pink-700 font-medium">
                年龄 🎂
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="请输入您的年龄"
                value={stepData.age || formData.age || ""}
                onChange={(e) => updateStepData("age", e.target.value)}
                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-pink-700 font-medium">
                身高 (cm) 📏
              </Label>
              <Input
                id="height"
                type="number"
                placeholder="请输入您的身高"
                value={stepData.height || formData.height || ""}
                onChange={(e) => updateStepData("height", e.target.value)}
                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
              />
            </div>
          </div>

          <div>
            <Label className="text-pink-700 font-medium">血型 🩸</Label>
            <RadioGroup
              value={stepData.bloodType || formData.bloodType || ""}
              onValueChange={(value) => updateStepData("bloodType", value)}
              className="flex flex-wrap gap-4 mt-2"
            >
              {["A型", "B型", "AB型", "O型", "不知道"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} className="text-pink-500" />
                  <Label htmlFor={type} className="text-pink-700">
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="birthday" className="text-pink-700 font-medium">
              生日 🎉
            </Label>
            <Input
              id="birthday"
              type="date"
              value={stepData.birthday || formData.birthday || ""}
              onChange={(e) => updateStepData("birthday", e.target.value)}
              className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div>
            <Label className="text-pink-700 font-medium">体型 👤</Label>
            <Select
              value={stepData.bodyType || formData.bodyType || ""}
              onValueChange={(value) => updateStepData("bodyType", value)}
            >
              <SelectTrigger className="border-pink-200 focus:border-pink-400">
                <SelectValue placeholder="选择您的体型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="瘦">瘦</SelectItem>
                <SelectItem value="标准">标准</SelectItem>
                <SelectItem value="微胖">微胖</SelectItem>
                <SelectItem value="胖">胖</SelectItem>
                <SelectItem value="健壮">健壮</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="hairTexture" className="text-pink-700 font-medium">
              发质 💇‍♀️
            </Label>
            <Input
              id="hairTexture"
              placeholder="例如：直发、卷发、自然卷等"
              value={stepData.hairTexture || formData.hairTexture || ""}
              onChange={(e) => updateStepData("hairTexture", e.target.value)}
              className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div>
            <Label htmlFor="skinColor" className="text-pink-700 font-medium">
              皮肤 ✨
            </Label>
            <Input
              id="skinColor"
              placeholder="描述您的皮肤特点"
              value={stepData.skinColor || formData.skinColor || ""}
              onChange={(e) => updateStepData("skinColor", e.target.value)}
              className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>
        </div>
      ),
    },
    {
      title: "外貌特征",
      description: "描述您的外貌特征",
      icon: Flower,
      color: "from-purple-400 to-pink-400",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-purple-700 font-medium">发型 ✂️</Label>
            <RadioGroup
              value={stepData.hairLength || formData.hairLength || ""}
              onValueChange={(value) => updateStepData("hairLength", value)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="短发" id="short" className="text-purple-500" />
                <Label htmlFor="short" className="text-purple-700">
                  短发
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="长发" id="long" className="text-purple-500" />
                <Label htmlFor="long" className="text-purple-700">
                  长发
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="hairColor" className="text-purple-700 font-medium">
              发色 🎨
            </Label>
            <Input
              id="hairColor"
              placeholder="例如：黑色、棕色、金色等"
              value={stepData.hairColor || formData.hairColor || ""}
              onChange={(e) => updateStepData("hairColor", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label className="text-purple-700 font-medium">肤色 🌟</Label>
            <Select
              value={stepData.skinTone || formData.skinTone || ""}
              onValueChange={(value) => updateStepData("skinTone", value)}
            >
              <SelectTrigger className="border-purple-200 focus:border-purple-400">
                <SelectValue placeholder="选择您的肤色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="白皙">白皙</SelectItem>
                <SelectItem value="自然">自然</SelectItem>
                <SelectItem value="小麦色">小麦色</SelectItem>
                <SelectItem value="偏黑">偏黑</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-purple-700 font-medium">指甲偏好 💅</Label>
            <RadioGroup
              value={stepData.nailPreference || formData.nailPreference || ""}
              onValueChange={(value) => updateStepData("nailPreference", value)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="长指甲" id="longNails" className="text-purple-500" />
                <Label htmlFor="longNails" className="text-purple-700">
                  长指甲
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="短指甲" id="shortNails" className="text-purple-500" />
                <Label htmlFor="shortNails" className="text-purple-700">
                  短指甲
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "性格与心理",
      description: "了解您的性格特点和心理类型",
      icon: Brain,
      color: "from-violet-400 to-purple-400",
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="mbti" className="text-violet-700 font-medium">
              MBTI 人格类型 🧠
            </Label>
            <Input
              id="mbti"
              placeholder="例如：INFP、ENFJ 等，不知道可留空"
              value={stepData.mbti || formData.mbti || ""}
              onChange={(e) => updateStepData("mbti", e.target.value)}
              className="border-violet-200 focus:border-violet-400 focus:ring-violet-400"
            />
          </div>

          <div>
            <Label htmlFor="personalityType" className="text-violet-700 font-medium">
              人格类型 🎭
            </Label>
            <Textarea
              id="personalityType"
              placeholder="描述您的人格类型..."
              value={stepData.personalityType || formData.personalityType || ""}
              onChange={(e) => updateStepData("personalityType", e.target.value)}
              className="border-violet-200 focus:border-violet-400 focus:ring-violet-400"
            />
          </div>

          <div>
            <Label htmlFor="personality" className="text-violet-700 font-medium">
              您认为自己的性格特点 ✨
            </Label>
            <Textarea
              id="personality"
              placeholder="描述您的性格特点..."
              value={stepData.personality || formData.personality || ""}
              onChange={(e) => updateStepData("personality", e.target.value)}
              className="border-violet-200 focus:border-violet-400 focus:ring-violet-400"
            />
          </div>

          <div>
            <Label htmlFor="weaknesses" className="text-violet-700 font-medium">
              您认为自己的缺点 🤔
            </Label>
            <Textarea
              id="weaknesses"
              placeholder="诚实地描述您的缺点..."
              value={stepData.weaknesses || formData.weaknesses || ""}
              onChange={(e) => updateStepData("weaknesses", e.target.value)}
              className="border-violet-200 focus:border-violet-400 focus:ring-violet-400"
            />
          </div>

          <div>
            <Label htmlFor="loveHistory" className="text-violet-700 font-medium">
              情史 💕
            </Label>
            <Textarea
              id="loveHistory"
              placeholder="分享您的情感经历..."
              value={stepData.loveHistory || formData.loveHistory || ""}
              onChange={(e) => updateStepData("loveHistory", e.target.value)}
              className="border-violet-200 focus:border-violet-400 focus:ring-violet-400"
            />
          </div>

          <div>
            <Label htmlFor="pastExperience" className="text-violet-700 font-medium">
              过去 📖
            </Label>
            <Textarea
              id="pastExperience"
              placeholder="分享您的过去经历..."
              value={stepData.pastExperience || formData.pastExperience || ""}
              onChange={(e) => updateStepData("pastExperience", e.target.value)}
              className="border-violet-200 focus:border-violet-400 focus:ring-violet-400"
            />
          </div>

          <div>
            <Label htmlFor="family" className="text-violet-700 font-medium">
              家庭 🏠
            </Label>
            <Textarea
              id="family"
              placeholder="描述您的家庭情况..."
              value={stepData.family || formData.family || ""}
              onChange={(e) => updateStepData("family", e.target.value)}
              className="border-violet-200 focus:border-violet-400 focus:ring-violet-400"
            />
          </div>

          <div>
            <Label htmlFor="partnerType" className="text-violet-700 font-medium">
              喜欢的伴侣类型 💖
            </Label>
            <Textarea
              id="partnerType"
              placeholder="描述您理想的伴侣类型..."
              value={stepData.partnerType || formData.partnerType || ""}
              onChange={(e) => updateStepData("partnerType", e.target.value)}
              className="border-violet-200 focus:border-violet-400 focus:ring-violet-400"
            />
          </div>

          <div>
            <Label className="text-violet-700 font-medium">社交偏好 👥</Label>
            <RadioGroup
              value={stepData.socialPreference || formData.socialPreference || ""}
              onValueChange={(value) => updateStepData("socialPreference", value)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="独处" id="alone" className="text-violet-500" />
                <Label htmlFor="alone" className="text-violet-700">
                  喜欢一个人独处
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="朋友" id="friends" className="text-violet-500" />
                <Label htmlFor="friends" className="text-violet-700">
                  喜欢和朋友一起
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "生活偏好",
      description: "您的日常生活偏好和习惯",
      icon: Star,
      color: "from-rose-400 to-pink-400",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-rose-700 font-medium">饮食偏好 🍽️</Label>
              <RadioGroup
                value={stepData.dietPreference || formData.dietPreference || ""}
                onValueChange={(value) => updateStepData("dietPreference", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="荤食" id="meat" className="text-rose-500" />
                  <Label htmlFor="meat" className="text-rose-700">
                    喜欢吃荤
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="素食" id="vegetarian" className="text-rose-500" />
                  <Label htmlFor="vegetarian" className="text-rose-700">
                    喜欢吃素
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-rose-700 font-medium">天气偏好 🌤️</Label>
              <RadioGroup
                value={stepData.weatherPreference || formData.weatherPreference || ""}
                onValueChange={(value) => updateStepData("weatherPreference", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="晴天" id="sunny" className="text-rose-500" />
                  <Label htmlFor="sunny" className="text-rose-700">
                    晴天
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="雨天" id="rainy" className="text-rose-500" />
                  <Label htmlFor="rainy" className="text-rose-700">
                    雨天
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-rose-700 font-medium">时间偏好 ⏰</Label>
              <RadioGroup
                value={stepData.timePreference || formData.timePreference || ""}
                onValueChange={(value) => updateStepData("timePreference", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="白天" id="day" className="text-rose-500" />
                  <Label htmlFor="day" className="text-rose-700">
                    白天
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="黑夜" id="night" className="text-rose-500" />
                  <Label htmlFor="night" className="text-rose-700">
                    黑夜
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-rose-700 font-medium">口味偏好 😋</Label>
              <RadioGroup
                value={stepData.tastePreference || formData.tastePreference || ""}
                onValueChange={(value) => updateStepData("tastePreference", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="甜口" id="sweet" className="text-rose-500" />
                  <Label htmlFor="sweet" className="text-rose-700">
                    甜口
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="酸口" id="sour" className="text-rose-500" />
                  <Label htmlFor="sour" className="text-rose-700">
                    酸口
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-rose-700 font-medium">饮品偏好 🧋</Label>
              <RadioGroup
                value={stepData.drinkPreference || formData.drinkPreference || ""}
                onValueChange={(value) => updateStepData("drinkPreference", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="奶茶" id="milktea" className="text-rose-500" />
                  <Label htmlFor="milktea" className="text-rose-700">
                    奶茶
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="咖啡" id="coffee" className="text-rose-500" />
                  <Label htmlFor="coffee" className="text-rose-700">
                    咖啡
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-rose-700 font-medium">奶制品偏好 🥛</Label>
              <RadioGroup
                value={stepData.milkPreference || formData.milkPreference || ""}
                onValueChange={(value) => updateStepData("milkPreference", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="酸奶" id="yogurt" className="text-rose-500" />
                  <Label htmlFor="yogurt" className="text-rose-700">
                    酸奶
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="牛奶" id="milk" className="text-rose-500" />
                  <Label htmlFor="milk" className="text-rose-700">
                    牛奶
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-rose-700 font-medium">运动偏好 🏃‍♀️</Label>
              <RadioGroup
                value={stepData.exercisePreference || formData.exercisePreference || ""}
                onValueChange={(value) => updateStepData("exercisePreference", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="兜风" id="driving" className="text-rose-500" />
                  <Label htmlFor="driving" className="text-rose-700">
                    兜风
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="散步" id="walking" className="text-rose-500" />
                  <Label htmlFor="walking" className="text-rose-700">
                    散步
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "兴趣爱好",
      description: "您的兴趣爱好和娱乐偏好",
      icon: Palette,
      color: "from-fuchsia-400 to-pink-400",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="favoriteColors" className="text-fuchsia-700 font-medium">
                喜欢的颜色 🎨
              </Label>
              <Input
                id="favoriteColors"
                placeholder="例如：蓝色、粉色、黑色等"
                value={stepData.favoriteColors || formData.favoriteColors || ""}
                onChange={(e) => updateStepData("favoriteColors", e.target.value)}
                className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
              />
            </div>

            <div>
              <Label htmlFor="favoriteStyle" className="text-fuchsia-700 font-medium">
                喜欢的穿搭 👗
              </Label>
              <Input
                id="favoriteStyle"
                placeholder="例如：甜美、酷帅、简约等"
                value={stepData.favoriteStyle || formData.favoriteStyle || ""}
                onChange={(e) => updateStepData("favoriteStyle", e.target.value)}
                className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
              />
            </div>

            <div>
              <Label htmlFor="favoriteStyleType" className="text-fuchsia-700 font-medium">
                喜欢的风格 ✨
              </Label>
              <Input
                id="favoriteStyleType"
                placeholder="例如：复古、现代、日系等"
                value={stepData.favoriteStyleType || formData.favoriteStyleType || ""}
                onChange={(e) => updateStepData("favoriteStyleType", e.target.value)}
                className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
              />
            </div>

            <div>
              <Label htmlFor="favoriteSeason" className="text-fuchsia-700 font-medium">
                喜欢的季节 🌸
              </Label>
              <Select
                value={stepData.favoriteSeason || formData.favoriteSeason || ""}
                onValueChange={(value) => updateStepData("favoriteSeason", value)}
              >
                <SelectTrigger className="border-fuchsia-200 focus:border-fuchsia-400">
                  <SelectValue placeholder="选择您喜欢的季节" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="春天">春天</SelectItem>
                  <SelectItem value="夏天">夏天</SelectItem>
                  <SelectItem value="秋天">秋天</SelectItem>
                  <SelectItem value="冬天">冬天</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="favoriteWeather" className="text-fuchsia-700 font-medium">
                喜欢的天气 🌤️
              </Label>
              <Input
                id="favoriteWeather"
                placeholder="例如：晴天、雨天、阴天等"
                value={stepData.favoriteWeather || formData.favoriteWeather || ""}
                onChange={(e) => updateStepData("favoriteWeather", e.target.value)}
                className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
              />
            </div>

            <div>
              <Label htmlFor="favoriteCity" className="text-fuchsia-700 font-medium">
                喜欢的城市 🏙️
              </Label>
              <Input
                id="favoriteCity"
                placeholder="您喜欢的城市"
                value={stepData.favoriteCity || formData.favoriteCity || ""}
                onChange={(e) => updateStepData("favoriteCity", e.target.value)}
                className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
              />
            </div>

            <div>
              <Label htmlFor="favoriteCountry" className="text-fuchsia-700 font-medium">
                喜欢的国家 🌍
              </Label>
              <Input
                id="favoriteCountry"
                placeholder="您喜欢的国家"
                value={stepData.favoriteCountry || formData.favoriteCountry || ""}
                onChange={(e) => updateStepData("favoriteCountry", e.target.value)}
                className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
              />
            </div>

            <div>
              <Label htmlFor="favoriteFlowers" className="text-fuchsia-700 font-medium">
                喜欢的花 🌺
              </Label>
              <Input
                id="favoriteFlowers"
                placeholder="您喜欢的花朵"
                value={stepData.favoriteFlowers || formData.favoriteFlowers || ""}
                onChange={(e) => updateStepData("favoriteFlowers", e.target.value)}
                className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
              />
            </div>

            <div>
              <Label htmlFor="favoriteLanguages" className="text-fuchsia-700 font-medium">
                喜欢的语种 🗣️
              </Label>
              <Input
                id="favoriteLanguages"
                placeholder="您喜欢的语言"
                value={stepData.favoriteLanguages || formData.favoriteLanguages || ""}
                onChange={(e) => updateStepData("favoriteLanguages", e.target.value)}
                className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
              />
            </div>

            <div>
              <Label htmlFor="favoriteAnimals" className="text-fuchsia-700 font-medium">
                喜欢的小动物 🐱
              </Label>
              <Input
                id="favoriteAnimals"
                placeholder="您喜欢的小动物"
                value={stepData.favoriteAnimals || formData.favoriteAnimals || ""}
                onChange={(e) => updateStepData("favoriteAnimals", e.target.value)}
                className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
              />
            </div>

            <div>
              <Label htmlFor="favoriteCuisine" className="text-fuchsia-700 font-medium">
                喜欢的菜式 🍽️
              </Label>
              <Input
                id="favoriteCuisine"
                placeholder="例如：川菜、粤菜、日料等"
                value={stepData.favoriteCuisine || formData.favoriteCuisine || ""}
                onChange={(e) => updateStepData("favoriteCuisine", e.target.value)}
                className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
              />
            </div>

            <div>
              <Label htmlFor="favoriteFood" className="text-fuchsia-700 font-medium">
                喜欢的食物 🍜
              </Label>
              <Input
                id="favoriteFood"
                placeholder="您最喜欢的具体食物"
                value={stepData.favoriteFood || formData.favoriteFood || ""}
                onChange={(e) => updateStepData("favoriteFood", e.target.value)}
                className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="favoriteMusic" className="text-fuchsia-700 font-medium">
              喜欢的音乐类型 🎵
            </Label>
            <Textarea
              id="favoriteMusic"
              placeholder="描述您喜欢的音乐类型..."
              value={stepData.favoriteMusic || formData.favoriteMusic || ""}
              onChange={(e) => updateStepData("favoriteMusic", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteSongs" className="text-fuchsia-700 font-medium">
              喜欢的歌曲 🎶
            </Label>
            <Textarea
              id="favoriteSongs"
              placeholder="列出您喜欢的歌曲..."
              value={stepData.favoriteSongs || formData.favoriteSongs || ""}
              onChange={(e) => updateStepData("favoriteSongs", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteSingers" className="text-fuchsia-700 font-medium">
              喜欢的歌手 🎤
            </Label>
            <Textarea
              id="favoriteSingers"
              placeholder="列出您喜欢的歌手..."
              value={stepData.favoriteSingers || formData.favoriteSingers || ""}
              onChange={(e) => updateStepData("favoriteSingers", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoritePhotos" className="text-fuchsia-700 font-medium">
              喜欢的照片 📸
            </Label>
            <Textarea
              id="favoritePhotos"
              placeholder="描述您喜欢的照片类型或风格..."
              value={stepData.favoritePhotos || formData.favoritePhotos || ""}
              onChange={(e) => updateStepData("favoritePhotos", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteMovies" className="text-fuchsia-700 font-medium">
              喜欢的电影 🎬
            </Label>
            <Textarea
              id="favoriteMovies"
              placeholder="描述您喜欢的电影..."
              value={stepData.favoriteMovies || formData.favoriteMovies || ""}
              onChange={(e) => updateStepData("favoriteMovies", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteAnime" className="text-fuchsia-700 font-medium">
              喜欢的动漫 🎌
            </Label>
            <Textarea
              id="favoriteAnime"
              placeholder="描述您喜欢的动漫..."
              value={stepData.favoriteAnime || formData.favoriteAnime || ""}
              onChange={(e) => updateStepData("favoriteAnime", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteCharacters" className="text-fuchsia-700 font-medium">
              喜欢的角色 👤
            </Label>
            <Textarea
              id="favoriteCharacters"
              placeholder="描述您喜欢的角色..."
              value={stepData.favoriteCharacters || formData.favoriteCharacters || ""}
              onChange={(e) => updateStepData("favoriteCharacters", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteIP" className="text-fuchsia-700 font-medium">
              喜欢的IP 🎯
            </Label>
            <Textarea
              id="favoriteIP"
              placeholder="描述您喜欢的IP..."
              value={stepData.favoriteIP || formData.favoriteIP || ""}
              onChange={(e) => updateStepData("favoriteIP", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteBloggers" className="text-fuchsia-700 font-medium">
              喜欢的博主 📱
            </Label>
            <Textarea
              id="favoriteBloggers"
              placeholder="描述您喜欢的博主..."
              value={stepData.favoriteBloggers || formData.favoriteBloggers || ""}
              onChange={(e) => updateStepData("favoriteBloggers", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteIdols" className="text-fuchsia-700 font-medium">
              喜欢的爱豆 ⭐
            </Label>
            <Textarea
              id="favoriteIdols"
              placeholder="描述您喜欢的爱豆..."
              value={stepData.favoriteIdols || formData.favoriteIdols || ""}
              onChange={(e) => updateStepData("favoriteIdols", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteBooks" className="text-fuchsia-700 font-medium">
              喜欢的书籍 📚
            </Label>
            <Textarea
              id="favoriteBooks"
              placeholder="描述您喜欢的书籍..."
              value={stepData.favoriteBooks || formData.favoriteBooks || ""}
              onChange={(e) => updateStepData("favoriteBooks", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteAuthors" className="text-fuchsia-700 font-medium">
              喜欢的作家 ✍️
            </Label>
            <Textarea
              id="favoriteAuthors"
              placeholder="描述您喜欢的作家..."
              value={stepData.favoriteAuthors || formData.favoriteAuthors || ""}
              onChange={(e) => updateStepData("favoriteAuthors", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteScenery" className="text-fuchsia-700 font-medium">
              喜欢的风景 🌄
            </Label>
            <Textarea
              id="favoriteScenery"
              placeholder="描述您喜欢的风景..."
              value={stepData.favoriteScenery || formData.favoriteScenery || ""}
              onChange={(e) => updateStepData("favoriteScenery", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteCulture" className="text-fuchsia-700 font-medium">
              喜欢的文化 🎭
            </Label>
            <Textarea
              id="favoriteCulture"
              placeholder="描述您喜欢的文化..."
              value={stepData.favoriteCulture || formData.favoriteCulture || ""}
              onChange={(e) => updateStepData("favoriteCulture", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteFriends" className="text-fuchsia-700 font-medium">
              喜欢的朋友 👫
            </Label>
            <Textarea
              id="favoriteFriends"
              placeholder="描述您喜欢的朋友类型..."
              value={stepData.favoriteFriends || formData.favoriteFriends || ""}
              onChange={(e) => updateStepData("favoriteFriends", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoritePhotoStyle" className="text-fuchsia-700 font-medium">
              喜欢的拍照姿势 📷
            </Label>
            <Textarea
              id="favoritePhotoStyle"
              placeholder="描述您喜欢的拍照姿势..."
              value={stepData.favoritePhotoStyle || formData.favoritePhotoStyle || ""}
              onChange={(e) => updateStepData("favoritePhotoStyle", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label htmlFor="favoriteExercise" className="text-fuchsia-700 font-medium">
              喜欢的运动方式 🏃‍♀️
            </Label>
            <Textarea
              id="favoriteExercise"
              placeholder="描述您喜欢的运动方式..."
              value={stepData.favoriteExercise || formData.favoriteExercise || ""}
              onChange={(e) => updateStepData("favoriteExercise", e.target.value)}
              className="border-fuchsia-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
            />
          </div>

          <div>
            <Label className="text-fuchsia-700 font-medium">消遣方式 🎯</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["打游戏", "听歌", "购物", "和朋友出去玩", "看书", "看电影", "运动", "其他"].map((activity) => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox
                    id={activity}
                    checked={(stepData.leisureActivities || formData.leisureActivities || []).includes(activity)}
                    onCheckedChange={(checked) => {
                      const current = stepData.leisureActivities || formData.leisureActivities || []
                      if (checked) {
                        updateStepData("leisureActivities", [...current, activity])
                      } else {
                        updateStepData(
                          "leisureActivities",
                          current.filter((a: string) => a !== activity),
                        )
                      }
                    }}
                    className="text-fuchsia-500"
                  />
                  <Label htmlFor={activity} className="text-fuchsia-700">
                    {activity}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "生活习惯",
      description: "您的日常生活习惯和特点",
      icon: Heart,
      color: "from-pink-400 to-rose-400",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-pink-700 font-medium">输入法偏好 ⌨️</Label>
            <RadioGroup
              value={stepData.inputMethod || formData.inputMethod || ""}
              onValueChange={(value) => updateStepData("inputMethod", value)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="9键" id="nine" className="text-pink-500" />
                <Label htmlFor="nine" className="text-pink-700">
                  9键
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="26键" id="twentysix" className="text-pink-500" />
                <Label htmlFor="twentysix" className="text-pink-700">
                  26键
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-pink-700 font-medium">食物质地偏好 🥐</Label>
            <RadioGroup
              value={stepData.foodTexture || formData.foodTexture || ""}
              onValueChange={(value) => updateStepData("foodTexture", value)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="硬的食物" id="hard" className="text-pink-500" />
                <Label htmlFor="hard" className="text-pink-700">
                  硬的食物
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="软的食物" id="soft" className="text-pink-500" />
                <Label htmlFor="soft" className="text-pink-700">
                  软的食物
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="sleepHabits" className="text-pink-700 font-medium">
              睡眠习惯 😴
            </Label>
            <Textarea
              id="sleepHabits"
              placeholder="描述您的睡眠质量、睡姿、是否踢被子等..."
              value={stepData.sleepHabits || formData.sleepHabits || ""}
              onChange={(e) => updateStepData("sleepHabits", e.target.value)}
              className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div>
            <Label htmlFor="quirks" className="text-pink-700 font-medium">
              奇怪的小癖好 🦄
            </Label>
            <Textarea
              id="quirks"
              placeholder="描述您有什么奇怪的小癖好..."
              value={stepData.quirks || formData.quirks || ""}
              onChange={(e) => updateStepData("quirks", e.target.value)}
              className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div>
            <Label htmlFor="allergies" className="text-pink-700 font-medium">
              过敏原 ⚠️
            </Label>
            <Input
              id="allergies"
              placeholder="如果有过敏原请填写，没有可留空"
              value={stepData.allergies || formData.allergies || ""}
              onChange={(e) => updateStepData("allergies", e.target.value)}
              className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div>
            <Label className="text-pink-700 font-medium">香水偏好 🌸</Label>
            <RadioGroup
              value={stepData.perfumePreference || formData.perfumePreference || ""}
              onValueChange={(value) => updateStepData("perfumePreference", value)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="柑橘" id="citrus" className="text-pink-500" />
                <Label htmlFor="citrus" className="text-pink-700">
                  柑橘
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="茉莉" id="jasmine" className="text-pink-500" />
                <Label htmlFor="jasmine" className="text-pink-700">
                  茉莉
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "个人想法",
      description: "您的内心想法和人生观",
      icon: Sparkles,
      color: "from-purple-400 to-fuchsia-400",
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="lifeGoals" className="text-purple-700 font-medium">
              未来规划 🌟
            </Label>
            <Textarea
              id="lifeGoals"
              placeholder="描述您的未来规划和目标..."
              value={stepData.lifeGoals || formData.lifeGoals || ""}
              onChange={(e) => updateStepData("lifeGoals", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="values" className="text-purple-700 font-medium">
              三观（人生观、价值观、世界观）💭
            </Label>
            <Textarea
              id="values"
              placeholder="描述您的三观..."
              value={stepData.values || formData.values || ""}
              onChange={(e) => updateStepData("values", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="birthdayWish" className="text-purple-700 font-medium">
              生日愿望 🎂
            </Label>
            <Textarea
              id="birthdayWish"
              placeholder="您的生日愿望会许什么..."
              value={stepData.birthdayWish || formData.birthdayWish || ""}
              onChange={(e) => updateStepData("birthdayWish", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="randomThoughts" className="text-purple-700 font-medium">
              脑中奇奇怪怪的想法 🌈
            </Label>
            <Textarea
              id="randomThoughts"
              placeholder="分享一些您脑中奇奇怪怪的想法..."
              value={stepData.randomThoughts || formData.randomThoughts || ""}
              onChange={(e) => updateStepData("randomThoughts", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="dislikes" className="text-purple-700 font-medium">
              反感的事物（总体） 😔
            </Label>
            <Textarea
              id="dislikes"
              placeholder="描述您反感的事物..."
              value={stepData.dislikes || formData.dislikes || ""}
              onChange={(e) => updateStepData("dislikes", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="dislikedFood" className="text-purple-700 font-medium">
              反感的食物 🚫🍽️
            </Label>
            <Textarea
              id="dislikedFood"
              placeholder="描述您反感的食物..."
              value={stepData.dislikedFood || formData.dislikedFood || ""}
              onChange={(e) => updateStepData("dislikedFood", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="dislikedPeople" className="text-purple-700 font-medium">
              反感的人 🚫👥
            </Label>
            <Textarea
              id="dislikedPeople"
              placeholder="描述您反感的人的类型..."
              value={stepData.dislikedPeople || formData.dislikedPeople || ""}
              onChange={(e) => updateStepData("dislikedPeople", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="dislikedBehavior" className="text-purple-700 font-medium">
              反感的行为 🚫🎭
            </Label>
            <Textarea
              id="dislikedBehavior"
              placeholder="描述您反感的行为..."
              value={stepData.dislikedBehavior || formData.dislikedBehavior || ""}
              onChange={(e) => updateStepData("dislikedBehavior", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="dislikedType" className="text-purple-700 font-medium">
              反感的类型 🚫🎯
            </Label>
            <Textarea
              id="dislikedType"
              placeholder="描述您反感的类型..."
              value={stepData.dislikedType || formData.dislikedType || ""}
              onChange={(e) => updateStepData("dislikedType", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="dislikedRules" className="text-purple-700 font-medium">
              反感的规矩 🚫📋
            </Label>
            <Textarea
              id="dislikedRules"
              placeholder="描述您反感的规矩..."
              value={stepData.dislikedRules || formData.dislikedRules || ""}
              onChange={(e) => updateStepData("dislikedRules", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="dislikedCircles" className="text-purple-700 font-medium">
              反感的圈子 🚫⭕
            </Label>
            <Textarea
              id="dislikedCircles"
              placeholder="描述您反感的圈子..."
              value={stepData.dislikedCircles || formData.dislikedCircles || ""}
              onChange={(e) => updateStepData("dislikedCircles", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="dislikeReasons" className="text-purple-700 font-medium">
              为什么会反感 🤷‍♀️
            </Label>
            <Textarea
              id="dislikeReasons"
              placeholder="解释您为什么会反感这些事物..."
              value={stepData.dislikeReasons || formData.dislikeReasons || ""}
              onChange={(e) => updateStepData("dislikeReasons", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label className="text-purple-700 font-medium">恋爱类型偏好 💕</Label>
            <RadioGroup
              value={stepData.loveType || formData.loveType || ""}
              onValueChange={(value) => updateStepData("loveType", value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="柏拉图" id="platonic" className="text-purple-500" />
                <Label htmlFor="platonic" className="text-purple-700">
                  柏拉图式恋爱
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="另一种" id="physical" className="text-purple-500" />
                <Label htmlFor="physical" className="text-purple-700">
                  另一种恋爱
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-purple-700 font-medium">恋爱节奏偏好 ⏰</Label>
            <RadioGroup
              value={stepData.relationshipStyle || formData.relationshipStyle || ""}
              onValueChange={(value) => updateStepData("relationshipStyle", value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="细水长流" id="slowLove" className="text-purple-500" />
                <Label htmlFor="slowLove" className="text-purple-700">
                  细水长流的恋爱
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="快餐式" id="fastLove" className="text-purple-500" />
                <Label htmlFor="fastLove" className="text-purple-700">
                  快餐式恋爱
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="fastLoveAttitude" className="text-purple-700 font-medium">
              对快餐式恋爱的态度 🍔💕
            </Label>
            <Textarea
              id="fastLoveAttitude"
              placeholder="描述您对快餐式恋爱的态度..."
              value={stepData.fastLoveAttitude || formData.fastLoveAttitude || ""}
              onChange={(e) => updateStepData("fastLoveAttitude", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="deepThoughts" className="text-purple-700 font-medium">
              内心深处的想法 💝
            </Label>
            <Textarea
              id="deepThoughts"
              placeholder="为什么希望有个人能真正对您产生兴趣，认真喜欢您，照顾您，并且想和您一直走下去..."
              value={stepData.deepThoughts || formData.deepThoughts || ""}
              onChange={(e) => updateStepData("deepThoughts", e.target.value)}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>
        </div>
      ),
    },
    {
      title: "详细特征",
      description: "更深入了解您的个人特征和行为习惯",
      icon: Sparkles,
      color: "from-indigo-400 to-purple-400",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-indigo-700 font-medium">会不会做饭 👩‍🍳</Label>
              <RadioGroup
                value={stepData.canCook || formData.canCook || ""}
                onValueChange={(value) => updateStepData("canCook", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="会" id="canCookYes" className="text-indigo-500" />
                  <Label htmlFor="canCookYes" className="text-indigo-700">会</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="不会" id="canCookNo" className="text-indigo-500" />
                  <Label htmlFor="canCookNo" className="text-indigo-700">不会</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-indigo-700 font-medium">会不会挑食 🥗</Label>
              <RadioGroup
                value={stepData.isPicky || formData.isPicky || ""}
                onValueChange={(value) => updateStepData("isPicky", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="会" id="isPickyYes" className="text-indigo-500" />
                  <Label htmlFor="isPickyYes" className="text-indigo-700">会</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="不会" id="isPickyNo" className="text-indigo-500" />
                  <Label htmlFor="isPickyNo" className="text-indigo-700">不会</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-indigo-700 font-medium">好不好骗 🤔</Label>
              <RadioGroup
                value={stepData.isGullible || formData.isGullible || ""}
                onValueChange={(value) => updateStepData("isGullible", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="好骗" id="gullibleYes" className="text-indigo-500" />
                  <Label htmlFor="gullibleYes" className="text-indigo-700">好骗</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="不好骗" id="gullibleNo" className="text-indigo-500" />
                  <Label htmlFor="gullibleNo" className="text-indigo-700">不好骗</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-indigo-700 font-medium">会不会抽烟 🚭</Label>
              <RadioGroup
                value={stepData.smoking || formData.smoking || ""}
                onValueChange={(value) => updateStepData("smoking", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="会" id="smokingYes" className="text-indigo-500" />
                  <Label htmlFor="smokingYes" className="text-indigo-700">会</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="不会" id="smokingNo" className="text-indigo-500" />
                  <Label htmlFor="smokingNo" className="text-indigo-700">不会</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            <Label htmlFor="dollMakeup" className="text-indigo-700 font-medium">
              属性娃娃的舞台妆造 🎭
            </Label>
            <Textarea
              id="dollMakeup"
              placeholder="描述您买的属性娃娃里面每一只娃娃对应的舞台妆造..."
              value={stepData.dollMakeup || formData.dollMakeup || ""}
              onChange={(e) => updateStepData("dollMakeup", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="actingCute" className="text-indigo-700 font-medium">
              撒娇是什么样子 🥺
            </Label>
            <Textarea
              id="actingCute"
              placeholder="描述您撒娇是什么样子..."
              value={stepData.actingCute || formData.actingCute || ""}
              onChange={(e) => updateStepData("actingCute", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="sleepQuality" className="text-indigo-700 font-medium">
              睡眠质量 😴
            </Label>
            <Textarea
              id="sleepQuality"
              placeholder="描述您的睡眠质量好不好..."
              value={stepData.sleepQuality || formData.sleepQuality || ""}
              onChange={(e) => updateStepData("sleepQuality", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="kickBlanket" className="text-indigo-700 font-medium">
              睡觉会不会踢被子 🛏️
            </Label>
            <Textarea
              id="kickBlanket"
              placeholder="描述您睡觉会不会踢被子..."
              value={stepData.kickBlanket || formData.kickBlanket || ""}
              onChange={(e) => updateStepData("kickBlanket", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="sleepPosition" className="text-indigo-700 font-medium">
              睡觉喜欢什么姿势 💤
            </Label>
            <Textarea
              id="sleepPosition"
              placeholder="描述您睡觉喜欢什么姿势..."
              value={stepData.sleepPosition || formData.sleepPosition || ""}
              onChange={(e) => updateStepData("sleepPosition", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="energySource" className="text-indigo-700 font-medium">
              为什么每天精力旺盛 ⚡
            </Label>
            <Textarea
              id="energySource"
              placeholder="描述为什么您每天精力旺盛..."
              value={stepData.energySource || formData.energySource || ""}
              onChange={(e) => updateStepData("energySource", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="alcoholTolerance" className="text-indigo-700 font-medium">
              酒量 🍷
            </Label>
            <Textarea
              id="alcoholTolerance"
              placeholder="描述您的酒量..."
              value={stepData.alcoholTolerance || formData.alcoholTolerance || ""}
              onChange={(e) => updateStepData("alcoholTolerance", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="boredActivities" className="text-indigo-700 font-medium">
              无聊的时候会做些什么 🎲
            </Label>
            <Textarea
              id="boredActivities"
              placeholder="描述您无聊的时候会做些什么..."
              value={stepData.boredActivities || formData.boredActivities || ""}
              onChange={(e) => updateStepData("boredActivities", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="darkSide" className="text-indigo-700 font-medium">
              阴暗面 🌑
            </Label>
            <Textarea
              id="darkSide"
              placeholder="描述您的阴暗面会是什么样子..."
              value={stepData.darkSide || formData.darkSide || ""}
              onChange={(e) => updateStepData("darkSide", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="drunkBehavior" className="text-indigo-700 font-medium">
              喝醉之后会耍什么酒疯 🍺
            </Label>
            <Textarea
              id="drunkBehavior"
              placeholder="描述您喝醉之后会耍什么酒疯..."
              value={stepData.drunkBehavior || formData.drunkBehavior || ""}
              onChange={(e) => updateStepData("drunkBehavior", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="giftPreference" className="text-indigo-700 font-medium">
              喜欢收到什么样的礼物 🎁
            </Label>
            <Textarea
              id="giftPreference"
              placeholder="描述您喜欢收到什么样的礼物..."
              value={stepData.giftPreference || formData.giftPreference || ""}
              onChange={(e) => updateStepData("giftPreference", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="angerStyle" className="text-indigo-700 font-medium">
              生气的时候会是什么样子 😠
            </Label>
            <Textarea
              id="angerStyle"
              placeholder="描述您生气的时候会是什么样子..."
              value={stepData.angerStyle || formData.angerStyle || ""}
              onChange={(e) => updateStepData("angerStyle", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="movieType" className="text-indigo-700 font-medium">
              喜欢看什么类型的小电影 🎬
            </Label>
            <Textarea
              id="movieType"
              placeholder="描述您喜欢看什么类型的小电影..."
              value={stepData.movieType || formData.movieType || ""}
              onChange={(e) => updateStepData("movieType", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="flirtingStyle" className="text-indigo-700 font-medium">
              喜欢以什么样的方式调情 💕
            </Label>
            <Textarea
              id="flirtingStyle"
              placeholder="描述您喜欢以什么样的方式调情..."
              value={stepData.flirtingStyle || formData.flirtingStyle || ""}
              onChange={(e) => updateStepData("flirtingStyle", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="conflictResolution" className="text-indigo-700 font-medium">
              吵架的时候会以什么方式解决 🤝
            </Label>
            <Textarea
              id="conflictResolution"
              placeholder="描述您吵架的时候会以什么方式解决..."
              value={stepData.conflictResolution || formData.conflictResolution || ""}
              onChange={(e) => updateStepData("conflictResolution", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <Label htmlFor="eyebrowStory" className="text-indigo-700 font-medium">
              为什么眉毛有一边只有一半 🤨
            </Label>
            <Textarea
              id="eyebrowStory"
              placeholder="描述为什么您的眉毛有一边只有一半..."
              value={stepData.eyebrowStory || formData.eyebrowStory || ""}
              onChange={(e) => updateStepData("eyebrowStory", e.target.value)}
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>
        </div>
      ),
    },
  ]

  const currentStepData = steps[currentStep]

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardHeader className={`bg-gradient-to-r ${currentStepData.color} text-white relative`}>
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <currentStepData.icon className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">{currentStepData.title}</CardTitle>
            <CardDescription className="text-white/90 text-lg">{currentStepData.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        {currentStepData.content}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 border-pink-200 text-pink-600 hover:bg-pink-50 shadow-md"
          >
            <ChevronLeft className="h-4 w-4" />
            上一步
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleFinalSubmit}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Heart className="h-4 w-4" />
              完成梦幻问卷
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              下一步
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

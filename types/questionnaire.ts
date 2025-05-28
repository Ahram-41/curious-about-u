export interface FormData {
  // 基本信息
  name?: string // 怎么称呼
  age?: string
  height?: string
  bloodType?: string
  birthday?: string
  bodyType?: string
  hairTexture?: string // 发质
  skinColor?: string // 皮肤

  // 外貌特征
  hairLength?: string
  hairColor?: string
  skinTone?: string
  nailPreference?: string

  // 性格与心理
  mbti?: string
  personality?: string
  personalityType?: string // 人格类型
  weaknesses?: string
  socialPreference?: string
  loveHistory?: string // 情史
  pastExperience?: string // 过去
  family?: string // 家庭
  partnerType?: string // 喜欢的伴侣类型

  // 生活偏好
  dietPreference?: string
  weatherPreference?: string
  timePreference?: string
  tastePreference?: string
  drinkPreference?: string
  milkPreference?: string // 酸奶还是牛奶
  exercisePreference?: string

  // 兴趣爱好
  favoriteColors?: string
  favoriteStyle?: string // 喜欢的穿搭
  favoriteStyleType?: string // 喜欢的风格
  favoriteMusic?: string
  favoriteSongs?: string // 喜欢的歌曲
  favoriteSingers?: string // 喜欢的歌手
  favoritePhotos?: string // 喜欢的照片
  favoriteMovies?: string
  favoriteAnime?: string // 喜欢的动漫
  favoriteCharacters?: string // 喜欢的角色
  favoriteIP?: string // 喜欢的ip
  favoriteBloggers?: string // 喜欢的博主
  favoriteIdols?: string // 喜欢的爱豆
  favoriteBooks?: string
  favoriteAuthors?: string // 喜欢的作家
  favoriteSeason?: string // 喜欢的季节
  favoriteWeather?: string // 喜欢的天气
  favoriteCity?: string // 喜欢的城市
  favoriteCountry?: string // 喜欢的国家
  favoriteFlowers?: string // 喜欢的花
  favoriteLanguages?: string // 喜欢的语种
  favoriteAnimals?: string // 喜欢的小动物
  favoriteCuisine?: string // 喜欢的菜式
  favoriteFood?: string // 喜欢的食物
  favoriteScenery?: string // 喜欢的风景
  favoriteCulture?: string // 喜欢的文化
  favoriteFriends?: string // 喜欢的朋友
  favoritePhotoStyle?: string // 喜欢的拍照姿势
  favoriteExercise?: string // 喜欢的运动方式
  leisureActivities?: string[]

  // 生活习惯
  inputMethod?: string
  foodTexture?: string
  sleepHabits?: string
  quirks?: string
  allergies?: string
  perfumePreference?: string // 香水偏好：柑橘还是茉莉
  dollMakeup?: string // 属性娃娃的舞台妆造
  canCook?: string // 会不会做饭
  isPicky?: string // 会不会挑食
  actingCute?: string // 撒娇是什么样子
  sleepQuality?: string // 睡眠质量
  kickBlanket?: string // 睡觉会不会踢被子
  sleepPosition?: string // 睡觉喜欢什么姿势
  energySource?: string // 为什么每天精力旺盛
  isGullible?: string // 好不好骗
  alcoholTolerance?: string // 酒量
  smoking?: string // 会不会抽烟
  boredActivities?: string // 无聊的时候会做些什么
  darkSide?: string // 阴暗面
  drunkBehavior?: string // 喝醉之后会耍什么酒疯
  giftPreference?: string // 喜欢收到什么样的礼物
  angerStyle?: string // 生气的时候会是什么样子
  movieType?: string // 喜欢看什么类型的小电影
  flirtingStyle?: string // 喜欢以什么样的方式调情
  conflictResolution?: string // 吵架的时候会以什么方式解决
  eyebrowStory?: string // 为什么眉毛有一边只有一半

  // 个人想法
  lifeGoals?: string
  values?: string
  birthdayWish?: string
  randomThoughts?: string
  dislikes?: string
  dislikedFood?: string // 反感的食物
  dislikedPeople?: string // 反感的人
  dislikedBehavior?: string // 反感的行为
  dislikedType?: string // 反感的类型
  dislikedRules?: string // 反感的规矩
  dislikedCircles?: string // 反感的圈子
  dislikeReasons?: string // 为什么会反感
  deepThoughts?: string
  loveType?: string // 柏拉图还是另一种恋爱
  relationshipStyle?: string // 细水长流还是快餐式恋爱
  fastLoveAttitude?: string // 对快餐式恋爱的态度
}

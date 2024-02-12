import { BlogListItemProps } from "./Components/BlogListItem";
import { ReadingListItemProps } from "./Components/ReadingListItem";
import { TopicProps } from "./Components/TopicItem";
import { LiteNotification } from "./Interfaces/NotificationTypes";

const backendConfig = {
  backendRoot: "http://localhost:5000/",
  auth: (route: string = "signup") => {
    const base = "auth/";
    switch (route) {
      case "signup": {
        return base + "signup";
      }
      case "login": {
        return base + "login";
      }
    }
  },
};

const notificationConfig = {
  title: "",
  message: "",
  type: "",
  insert: "top",
  container: "top-center",
  dismiss: {
    duration: 5000,
  },
  animationIn: ["animate__animated animate__fadeIn"],
  animationOut: ["animate__animated animate__fadeOut"],
};

const dummyImageConfig = {
  root: "https://dummyimage.com",
  baseColor: (bg: string = "/9fa4af", text: string = "/282c35") => {
    return bg + text + ".png";
  },
  presets: {
    blogListItem: "/600x400",
    banner: "/1400x300",
    feedPosts: "/75x75",
    readingListItem: "/184x210",
    topicsListItem: "/48x48",
    popularListItem: "/387x237",
  },
} as const;

const dummyImagePresets = {
  blogListItem:
    dummyImageConfig.root +
    dummyImageConfig.presets.blogListItem +
    dummyImageConfig.baseColor,
  banner:
    dummyImageConfig.root +
    dummyImageConfig.presets.banner +
    dummyImageConfig.baseColor,
  PopularPostItem:
    dummyImageConfig.root +
    dummyImageConfig.presets.feedPosts +
    dummyImageConfig.baseColor,
  ReadingListItem:
    dummyImageConfig.root +
    dummyImageConfig.presets.readingListItem +
    dummyImageConfig.baseColor,
  TopicsListItem:
    dummyImageConfig.root +
    dummyImageConfig.presets.topicsListItem +
    dummyImageConfig.baseColor,
  PopularListItem:
    dummyImageConfig.root +
    dummyImageConfig.presets.popularListItem +
    dummyImageConfig.baseColor,
};

const SocialMediaIconsConfig = {
  default: {
    insta: require("./Assets/images/social_media_default/Insta.png"),
    reddit: require("./Assets/images/social_media_default/Reddit.png"),
    github: require("./Assets/images/social_media_default/Github.png"),
    twitter: require("./Assets/images/social_media_default/Twitter.png"),
  },
  pink: {
    insta: require("./Assets/images/social_media_pink/Insta.png"),
    reddit: require("./Assets/images/social_media_pink/Reddit.png"),
    github: require("./Assets/images/social_media_pink/Github.png"),
    twitter: require("./Assets/images/social_media_pink/Twitter.png"),
  },
};

const AvatarIconsConfig = {
  default: require("./Assets/images/default-image-png.png"),
};

const ReadingListsData = [
  {
    image: dummyImagePresets.ReadingListItem,
    tagTitle: "Occult",
    text: "Delve into mystical realms, ancient knowledge, and esoteric practices through enchanting texts that unravel the secrets of the occult.",
  },
  {
    image: dummyImagePresets.ReadingListItem,
    tagTitle: "Fitness",
    text: "Transform your body and mind with fitness revelations. Discover workout routines, nutrition essentials, and mental wellness tips for a healthier lifestyle.",
  },
  {
    image: dummyImagePresets.ReadingListItem,
    tagTitle: "Finance",
    text: "Explore investment strategies, analyze market trends, and secure your financial future with insightful reads on wealth management and economics.",
  },
  {
    image: dummyImagePresets.ReadingListItem,
    tagTitle: "Occult",
    text: "Delve into mystical realms, ancient knowledge, and esoteric practices through enchanting texts that unravel the secrets of the occult.",
  },
  {
    image: dummyImagePresets.ReadingListItem,
    tagTitle: "Fitness",
    text: "Transform your body and mind with fitness revelations. Discover workout routines, nutrition essentials, and mental wellness tips for a healthier lifestyle.",
  },
  {
    image: dummyImagePresets.ReadingListItem,
    tagTitle: "Finance",
    text: "Explore investment strategies, analyze market trends, and secure your financial future with insightful reads on wealth management and economics.",
  },
] as ReadingListItemProps[];

const TopicsListData = [
  {
    icon: dummyImagePresets.TopicsListItem,
    tagTitle: "Occult",
    text: "Delve into mystical realms, ancient knowledge, and esoteric practices through enchanting texts that unravel the secrets of the occult.",
  },
  {
    icon: dummyImagePresets.TopicsListItem,
    tagTitle: "Fitness",
    text: "Transform your body and mind with fitness revelations. Discover workout routines, nutrition essentials, and mental wellness tips for a healthier lifestyle.",
  },
  {
    icon: dummyImagePresets.TopicsListItem,
    tagTitle: "Finance",
    text: "Explore investment strategies, analyze market trends, and secure your financial future with insightful reads on wealth management and economics.",
  },
  {
    icon: dummyImagePresets.TopicsListItem,
    tagTitle: "Occult",
    text: "Delve into mystical realms, ancient knowledge, and esoteric practices through enchanting texts that unravel the secrets of the occult.",
  },
  {
    icon: dummyImagePresets.TopicsListItem,
    tagTitle: "Fitness",
    text: "Transform your body and mind with fitness revelations. Discover workout routines, nutrition essentials, and mental wellness tips for a healthier lifestyle.",
  },
  {
    icon: dummyImagePresets.TopicsListItem,
    tagTitle: "Finance",
    text: "Explore investment strategies, analyze market trends, and secure your financial future with insightful reads on wealth management and economics.",
  },
] as TopicProps[];

const blogListItemProps = [
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    username: "domino domina",
    tag: "Finance",
    image: dummyImagePresets.blogListItem,
  },
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    username: "domino domina",
    tag: "Finance",
    image: dummyImagePresets.blogListItem,
  },
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    username: "domino domina",
    tag: "Finance",
    image: dummyImagePresets.blogListItem,
  },
];

const blogListItemPropsWithPrevText = [
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    username: "domino domina",
    tag: "Finance",
    image: dummyImagePresets.blogListItem,
    previewText:
      "Dive into the world of finance with us! Our blog is your go-to resource for savvy money management, investment insights, and smart financial decisions. Discover practical tips, expert advice, and success stories that will empower your financial journey.",
  },
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    username: "domino domina",
    tag: "Finance",
    image: dummyImagePresets.blogListItem,
    previewText:
      "Dive into the world of finance with us! Our blog is your go-to resource for savvy money management, investment insights, and smart financial decisions. Discover practical tips, expert advice, and success stories that will empower your financial journey.",
  },
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    username: "domino domina",
    tag: "Finance",
    image: dummyImagePresets.blogListItem,
    previewText:
      "Dive into the world of finance with us! Our blog is your go-to resource for savvy money management, investment insights, and smart financial decisions. Discover practical tips, expert advice, and success stories that will empower your financial journey.",
  },
] as BlogListItemProps[];

const popularSidePanelContent = [
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    tag: "Finance",
    image: dummyImagePresets.PopularPostItem,
  },
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    tag: "Finance",
    image: dummyImagePresets.PopularPostItem,
  },
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    tag: "Finance",
    image: dummyImagePresets.PopularPostItem,
  },
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    tag: "Finance",
    image: dummyImagePresets.PopularPostItem,
  },
];

const recentSidePanelContent = [
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    tag: "Finance",
  },
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    tag: "Finance",
  },
  {
    title:
      "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    tag: "Finance",
  },
];

const sidePanelWrapperProps = [
  {
    type: "PopularPosts",
    title: "Popular Posts",
    content: popularSidePanelContent,
  },
  {
    type: "RecentPosts",
    title: "Recent Posts",
    content: recentSidePanelContent,
  },
  {
    type: "SocialMediaIcons",
    title: "Social Media",
    content: { type: "pink" },
  },
];

const popularListsItemProps = [
  {
    title: "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    text: "Dive into the world of finance with us! Our blog is your go-to resource for savvy money management, investment insights, and smart financial decisions. Discover practical tips, expert advice, and success stories that will empower your financial journey.",
    image: dummyImagePresets.PopularListItem,
  },
  {
    title: "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    text: "Dive into the world of finance with us! Our blog is your go-to resource for savvy money management, investment insights, and smart financial decisions. Discover practical tips, expert advice, and success stories that will empower your financial journey.",
    image: dummyImagePresets.PopularListItem,
  },
  {
    title: "Certainly, you can create a mixin in SCSS from the .content-text class with the option to vary the font size while keeping the 'var' ",
    text: "Dive into the world of finance with us! Our blog is your go-to resource for savvy money management, investment insights, and smart financial decisions. Discover practical tips, expert advice, and success stories that will empower your financial journey.",
    image: dummyImagePresets.PopularListItem,
  }
]

const miniCardProps = [
  {
    tag: blogListItemProps[1].tag,
    title: blogListItemProps[0].title,
  },
  {
    tag: blogListItemProps[1].tag,
    title: blogListItemProps[0].title,
  },
  {
    tag: blogListItemProps[1].tag,
    title: blogListItemProps[0].title,
  },
  {
    tag: blogListItemProps[1].tag,
    title: blogListItemProps[0].title,
  },
]

const userProfileProps = {
  banner: dummyImagePresets.banner,
  profilePic: AvatarIconsConfig.default,
  userTitle: "Domino Domina",
};

const contentProps = {
  primary: blogListItemProps,
  sidePanel: sidePanelWrapperProps,
};

const HomeCardItemProps = [
  {
    tagTitle: blogListItemProps[2].tag,
    blogItem : blogListItemPropsWithPrevText[0],
    miniCardItems: miniCardProps
  },
  {
    tagTitle: blogListItemProps[2].tag,
    blogItem : blogListItemPropsWithPrevText[0],
    miniCardItems: miniCardProps
  },
  {
    tagTitle: blogListItemProps[2].tag,
    blogItem : blogListItemPropsWithPrevText[0],
    miniCardItems: miniCardProps
  },
  {
    tagTitle: blogListItemProps[2].tag,
    blogItem : blogListItemPropsWithPrevText[0],
    miniCardItems: miniCardProps
  }
]

const largeCardMiniCardsHomeProps = [
  {
    tagTitle: blogListItemProps[2].tag,
    items: {
      blogItem : blogListItemPropsWithPrevText[0],
      miniCardItems: miniCardProps
    }
  },
  {
    tagTitle: blogListItemProps[2].tag,
    items: {
      blogItem : blogListItemPropsWithPrevText[0],
      miniCardItems: miniCardProps
    }
  },
  {
    tagTitle: blogListItemProps[2].tag,
    items: {
      blogItem : blogListItemPropsWithPrevText[0],
      miniCardItems: miniCardProps
    }
  },
  {
    tagTitle: blogListItemProps[2].tag,
    items: {
      blogItem : blogListItemPropsWithPrevText[0],
      miniCardItems: miniCardProps
    }
  },
]

const SidePanelSliderProps = [
  {
    image: dummyImagePresets.ReadingListItem,
    tagTitle: HomeCardItemProps[0].tagTitle
  },
  {
    image: dummyImagePresets.ReadingListItem,
    tagTitle: HomeCardItemProps[0].tagTitle
  },
  {
    image: dummyImagePresets.ReadingListItem,
    tagTitle: HomeCardItemProps[0].tagTitle
  },
  {
    image: dummyImagePresets.ReadingListItem,
    tagTitle: HomeCardItemProps[0].tagTitle
  },


]

const SidePanelSliderHomeProps = {
    tagTitle: HomeCardItemProps[1].tagTitle,
    items: {
      items: SidePanelSliderProps
    }
}

export const notifications = {
  createBlogSuccess : {
    title: "Success!",
    message: "The blog post was created successfully!",
    type: "success",
  },
  saveDraftSuccess : {
    title: "Success!",
    message: "The blog post was saved successfully!",
    type: "success",
  }
} as const 

export default {
  backendConfig,
  notificationConfig,
  dummyImageConfig,
  dummyImagePresets,
  SocialMediaIconsConfig,
  ReadingListsData,
  TopicsListData,
  popularSidePanelContent,
  recentSidePanelContent,
  sidePanelWrapperProps,
  AvatarIconsConfig,
  blogListItemProps,
  userProfileProps,
  contentProps,
  blogListItemPropsWithPrevText,
  popularListsItemProps,
  HomeCardItemProps,
  SidePanelSliderProps,
  largeCardMiniCardsHomeProps,
  SidePanelSliderHomeProps
};

interface CommonSidePanelItem {
    tag: string;
    title: string;
}

interface SidePanelPopularItem extends CommonSidePanelItem {
    image: string
}

interface SidePanelRecentItem extends CommonSidePanelItem{}

interface SidePanelSocialIcons{
    type: string
}

type SidePanelContent = (SidePanelPopularItem | SidePanelRecentItem)[] | SidePanelSocialIcons | null



type SidePanelTypes = "PopularPosts" | "RecentPosts" | "SocialMediaIcons"

interface SidePanelWrapperProps{
    type: string,
    title: string,
    content: SidePanelContent
}

enum SidePanelEnumTypes  {
    popularPosts = "PopularPosts",
    recentPosts = "RecentPosts",
    socialMediaIcons = "SocialMediaIcons"
}



export type {SidePanelPopularItem, SidePanelWrapperProps, SidePanelContent,SidePanelRecentItem, SidePanelSocialIcons}
// export {SidePanelTypes}
import { IPost } from "../interfaces/post";
export const digitalInclusionPosts: IPost[] = [
  {
    id: 1,
    title: "Bridging the Digital Gap",
    detail:
      "Digital inclusion ensures that everyone—especially persons with disabilities—has equal access to online services, tools, and opportunities. It goes beyond devices, addressing affordability, connectivity, skills, and accessible design to create an inclusive digital society.",
    avatar: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
  },
  {
    id: 2,
    title: "Empowering Lives with Assistive Tech",
    detail:
      "Assistive technologies like screen readers, speech-to-text tools, alternative keyboards, and mobility devices empower individuals with disabilities to learn, work, and communicate more independently. These technologies help remove barriers that limit participation.",
    avatar: "https://images.pexels.com/photos/3184421/pexels-photo-3184421.jpeg"
  },
  {
    id: 3,
    title: "Accessible Digital Services",
    detail:
      "When websites, apps, and systems are built with accessibility in mind, people with visual, hearing, mobility, or cognitive impairments can use them effectively. Features like captions, proper contrast, alt text, and keyboard navigation improve usability for all.",
    avatar: "https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg"
  },
  {
    id: 4,
    title: "Inclusive Education Through Technology",
    detail:
      "Digital tools enable inclusive learning by offering flexible formats such as audio lessons, screen-reading tools, digital textbooks, and interpreter services. Technology helps students with disabilities learn at their pace and access quality education.",
    avatar: "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg"
  },
  {
    id: 5,
    title: "Accessible Workspaces",
    detail:
      "Modern workplaces are adopting inclusive software, captioned meetings, ergonomic devices, and remote-work tools to create equal employment opportunities for persons with disabilities. Inclusive digital practices foster productivity and dignity.",
    avatar: "https://images.pexels.com/photos/4065133/pexels-photo-4065133.jpeg"
  },
  {
    id: 6,
    title: "Tech for Independent Living",
    detail:
      "Smart-home devices, navigation apps, AI assistants, and health-monitoring tools enable persons with disabilities to live more independently. These innovations support daily tasks, strengthen safety, and enhance overall quality of life.",
    avatar: "https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg"
  }
] as IPost[];

export const Posts: IPost[] = digitalInclusionPosts.map((item) => ({
  ...item, createdAt: new Date().toISOString()
}))
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Profile } from "./profile.entity";

export enum SocialPlatform {
  TELEGRAM = "telegram",
  WHATSAPP = "whatsapp",
  INSTAGRAM = "instagram",
  TWITTER = "twitter",
  FACEBOOK = "facebook",
  LINKEDIN = "linkedin",
  YOUTUBE = "youtube",
  TIKTOK = "tiktok",
  DISCORD = "discord",
  SNAPCHAT = "snapchat",
  REDDIT = "reddit",
  PINTEREST = "pinterest",
  THREADS = "threads",
}

@Entity()
export class ProfileSocials extends customBaseEntity<string>("uuid") {
  @Column({ type: "integer" })
  profileId: number;

  @ManyToOne(() => Profile, (Profile) => Profile.socials, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "profileId" })
  profile: Profile;

  @Column({ type: "varchar", length: 30, default: SocialPlatform.TELEGRAM })
  type: SocialPlatform;

  @Column()
  url: string;
}

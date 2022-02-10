import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { Book } from '.';

@Entity({ schema: 'foo' })
export class Publisher {

  @PrimaryKey()
  _id!: string;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  name: string;

  @Enum()
  type: PublisherType;

  @OneToMany(() => Book, b => b.publisher)
  books = new Collection<Book>(this);

  constructor(name: string, type = PublisherType.LOCAL) {
    this.name = name;
    this.type = type;
  }

}

export enum PublisherType {
  LOCAL = 'local',
  GLOBAL = 'global',
}

import { createSchema, list } from "@keystone-next/keystone/schema";
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  checkbox,
  decimal,
} from "@keystone-next/fields";
import { document } from "@keystone-next/fields-document";

export const lists = createSchema({
  Equipo_de_riego: list({
    ui: { listView: {
      initialColumns: ["nombre", "latitud", "longitud", "estado_actual", "alta", "observaciones"]
    }},
    fields: {
      nombre: text({ isRequired: true }),
      latitud: decimal({ isRequired: false }), // TODO: revisar si existe un tipo posicion en keystone 6/next
      longitud: decimal({ isRequired: false }),
      estado_actual: select({
        isRequired: true,
        options: [
          { label: "Sin telemetría", value: "sin_telemetria" },
          { label: "Instalado", value: "instalado" },
        ],
        ui: {
          displayMode: "segmented-control",
        },
      }),
      alta: checkbox({ isRequired: false }),
      observaciones: text({ isRequired: false }),
    },
  }),
  User: list({
    ui: {
      listView: {
        initialColumns: ["name", "posts"],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      password: password({ isRequired: true }),
      posts: relationship({ ref: "Post.author", many: true }),
    },
  }),
  Post: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
        ],
        ui: {
          displayMode: "segmented-control",
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineCreate: { fields: ["name", "email"] },
        },
      }),
      tags: relationship({
        ref: "Tag.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] },
        },
        many: true,
      }),
    },
  }),
  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({
        ref: "Post.tags",
        many: true,
      }),
    },
  }),
});

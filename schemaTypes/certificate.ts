import { defineField, defineType } from 'sanity'

export const certificate = defineType({
  name: 'certificate',
  title: 'Certificate & Recognition',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Award Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Organization / Host',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Art & Design', value: 'Art & Design' },
          { title: 'Coding & Tech', value: 'Coding & Tech' },
          { title: 'Workshops & Competitions', value: 'Workshops & Competitions' },
          { title: 'Others', value: 'Others' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Certificate Scan / Badge Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Additional Notes / Highlights',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Verification Link / Credential URL',
      type: 'url',
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript / Supplemental PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
      media: 'image',
    },
  },
})

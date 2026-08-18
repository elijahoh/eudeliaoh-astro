import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Eudelia Studio',
  projectId: '4ojaxary',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Dedicated Pinned Items folder
            S.listItem()
              .title('📌 Pinned Items')
              .child(
                S.list()
                  .title('Pinned Content')
                  .items([
                    S.listItem()
                      .title('Pinned Posts')
                      .child(
                        S.documentList()
                          .title('Pinned Posts')
                          .filter('_type == "post" && pinned == true')
                      ),
                    S.listItem()
                      .title('Pinned Portfolio')
                      .child(
                        S.documentList()
                          .title('Pinned Portfolio')
                          .filter('_type == "portfolio" && pinned == true')
                      ),
                  ])
              ),

            // Category Folders (Filtered views)
            S.listItem()
              .title('📁 Items by Category')
              .child(
                S.list()
                  .title('Categories')
                  .items([
                    S.listItem()
                      .title('Crafts')
                      .child(
                        S.documentList()
                          .title('Crafts')
                          .filter('_type in ["portfolio", "post"] && category == "crafts"')
                      ),
                    S.listItem()
                      .title('Illustrations')
                      .child(
                        S.documentList()
                          .title('Illustrations')
                          .filter('_type in ["portfolio", "post"] && category == "illustrations"')
                      ),
                    S.listItem()
                      .title('Digital Art')
                      .child(
                        S.documentList()
                          .title('Digital Art')
                          .filter('_type in ["portfolio", "post"] && category == "digital-art"')
                      ),
                    S.listItem()
                      .title('Coding')
                      .child(
                        S.documentList()
                          .title('Coding')
                          .filter('_type in ["portfolio", "post"] && category == "coding"')
                      ),
                    S.listItem()
                      .title('Journal')
                      .child(
                        S.documentList()
                          .title('Journal')
                          .filter('_type == "post" && category == "journal"')
                      ),
                  ])

              ),

            S.divider(),
            // Standard document list for all items
            ...S.documentTypeListItems(),
          ]),
    }),
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
});

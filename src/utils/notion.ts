import { Block, BlockType, Clipping, CreatePageProperties } from "../interfaces";

/* Function to make an array of Notion blocks given the array of highlights and the block type
   Used when appending highlights to an existing Notion page for the book */
export const makeBlocks = (texts: string[], type: BlockType): Block[] => {
  const blocks: Block[] = [];
  for (const text of texts) {
    const validText = text.length > 2000 ? text.substring(0, 2000) : text;
    const block: Block = {
      object: "block",
      type,
    };
    block[type] = {
      text: [
        {
          type: "text",
          text: {
            content: validText,
            link: null,
          },
        },
      ],
    };
    blocks.push(block);
  }
  return blocks;
};

export const makeHighlights = (highlights: Clipping[]): Block[] => {
  // @ts-ignore
  return highlights.map((highlight) => ({
    ...makeBlocks([`Page: ${highlight.pageLocation}   |   ${highlight.dateAdded}`], BlockType.paragraph),
    ...makeBlocks([highlight.text], BlockType.quote)
  }));
}

/* Function to make an array of Notion blocks with a title: "Kindle Notes". 
   Used when creating a new Notion page for the book*/
export const makeHighlightsBlocks = (
  highlights: Clipping[],
): Block[] => {
  return [
    ...makeBlocks(["Kindle Notes"], BlockType.heading_2),
    ...makeHighlights(highlights),
  ];
};

/* Function to generate the configuration required to create a new Notion page */
export const makePageProperties = (
  pageProperties: CreatePageProperties
): Record<string, unknown> => {
  const properties = {
    Title: {
      title: [
        {
          text: {
            content: pageProperties.title,
          },
        },
      ],
    },
    Author: {
      type: "rich_text",
      rich_text: [
        {
          type: "text",
          text: {
            content: pageProperties.author,
          },
        },
      ],
    },
    "Book Name": {
      type: "rich_text",
      rich_text: [
        {
          type: "text",
          text: {
            content: pageProperties.bookName,
          },
        },
      ],
    },
  };
  return properties;
};

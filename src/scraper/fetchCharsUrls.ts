import axios from 'axios';
import cheerio from 'cheerio';
import { BASE_WIKI_URL } from './constants';

export const getCharactersUrls = async (url: string): Promise<string[]> => {
  try {
    console.log('Fetching Characters List');
    const response = await axios.get<string>(url);
    const $ = cheerio.load(response.data);
    const charactersUrls: string[] = [];
    console.log('Parsing Characters Urls');
    $(
      // selects the tables
      '#mw-content-text > div.mw-parser-output > table.article-table.sortable',
    ).each((index, value) => {
      if (index === 0) {
        // only the first table, the second one is for unreleased characters
        const trs = $(value).find('tr'); // get rows
        trs.each((i, element) => {
          if (i > 0) {
            // the first one doesn't have "a"
            const charPath = $(element).find('td:nth-child(2) > a').attr('href');
            if (charPath) {
              charactersUrls.push(BASE_WIKI_URL + charPath);
            }
          }
        });
      }
    });
    console.log(`Retrieved ${charactersUrls.length} Characters Urls Successfully`);
    return charactersUrls;
  } catch (error) {
    throw new Error(String(error));
  }
};

/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { flow } from 'lodash';
import React, { ComponentType } from 'react';
import SearchClean, { SearchResult as SearchResultClean } from '@bodiless/search';
import {
  addClasses,
  withDesign,
  stylable,
} from '@bodiless/fclasses';

const Icon = flow(
  addClasses('material-icons cursor-pointer align-middle'),
)(stylable((props: any) => (<i {...props}>{props.children}</i>)));

const withIcon = (icon: string) => (Component: ComponentType) => (props: any) => (
  <Component {...props}>
    <Icon>{icon}</Icon>
  </Component>
);
const withSearchButton = (icon: string) => flow(
  withIcon(icon),
);

const searchDesign = {
  SearchWrapper: addClasses('my-4 border bl-border-black align-middle'),
  SearchBox: addClasses('px-2 align-middle text-1xl'),
  SearchButton: withSearchButton('search'),
};

const searchInlineDesign = {
  SearchWrapper: addClasses('inline-block border bl-border-black align-middle bl-react-tags__search-input'),
  SearchBox: addClasses('px-2 align-middle text-1xl'),
  SearchButton: withSearchButton('search'),
};

const asSimpleSearch = withDesign(searchDesign);
const asInlineSearch = withDesign(searchInlineDesign);

const searchResultDesign = {
  SearchResultWrapper: addClasses('py-2'),
  SearchResultList: addClasses('py-2'),
  SearchResultSummary: addClasses('text-sm italic'),
  SearchResultListItem: withDesign({
    ItemAnchor: addClasses('my-4 bl-text-blue-500 underline'),
    ItemParagraph: addClasses('text-sm'),
    ItemList: addClasses('my-4'),
  }),
};

const asSimpleSearchResult = withDesign(searchResultDesign);

export const SearchResult = flow(
  asSimpleSearchResult,
)(SearchResultClean);

export const InlineSearchBox = flow(asInlineSearch)(SearchClean);
export const SimpleSearchBox = flow(asSimpleSearch)(SearchClean);

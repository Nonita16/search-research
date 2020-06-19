import * as React from 'react';
import { IAuthContext, withAuthContext } from 'ui-tool-kit';

const ResearchContext = React.createContext({});

export interface IResearchItem {
  author: string,
  title: string,
  subTitle: string,
  documentType: string,
  datePublished: Date,
}

interface IResearchState {
  items: Array<IResearchItem>;
}

export interface IResearchContext {
  search(search: string): Promise<IResearchItem[]>
}

class ResearchProvider extends React.Component<{ authContext: IAuthContext }, IResearchState> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [{
        author: 'Steven Hawkins',
        datePublished: new Date(),
        documentType: 'PDF',
        subTitle: 'one of the best selling books of all time',
        title: 'A Brief history of Time'
      }, {
        author: 'Gene Kranz',
        datePublished: new Date(),
        documentType: 'PDF',
        subTitle: 'one of the best selling books of all time',
        title: 'Failure is not an option'
      }, {
        author: 'Robert Ludlum',
        datePublished: new Date(),
        documentType: 'PDF',
        subTitle: 'one of the best selling books of all time',
        title: 'The Bourne Identity'
      }, {
        author: 'Robert Ludlum',
        datePublished: new Date(),
        documentType: 'PDF',
        subTitle: 'one of the best selling books of all time',
        title: 'The Bourne Ultimatum'
      }] as Array<IResearchItem>
    }
    this.search = this.search.bind(this);
  }
  public render() {
    return (
      <ResearchContext.Provider value={{
        search: this.search
      }}>
        {this.props.children}
      </ResearchContext.Provider>
    );
  }
  private search(search: string): Promise<IResearchItem[]> {
    const { items } = this.state;
    const itemList: IResearchItem[] = [];
    for (let i = 0; i < items.length; i++) {
      console.log(items[i]);
      if (items[i].author.toLowerCase().includes(search) || items[i].subTitle.toLowerCase().includes(search) || items[i].title.toLowerCase().includes(search)) {
        itemList.push(items[i]);
      }
    }
    return Promise.resolve(itemList);
  }
}

export default (withAuthContext)(ResearchProvider);

export const withResearchContext = (WrappedComponent: any) => {
  return (props: any) => (
    <ResearchContext.Consumer>
      {(researchContext: IResearchContext) => (<WrappedComponent researchContext={researchContext} {...props} />)}
    </ResearchContext.Consumer>
  );
}
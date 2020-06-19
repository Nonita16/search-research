import * as React from 'react';
import { IResearchContext, IResearchItem, withResearchContext } from '../ResearchProvider';

export interface IResearchProps {
  search: string;
  researchContext: IResearchContext
}

interface IResearchState {
  items: Array<IResearchItem>;
  error: any;
  loading: boolean;
}

class ResearchQueryHandler extends React.Component<IResearchProps, IResearchState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      items: [],
      loading: false
    };
  }
  public componentDidUpdate(prevProps: IResearchProps) {
    if (prevProps.search !== this.props.search) {
      const { search } = this.props.researchContext;
      this.setState({ error: null, loading: true, items: [] });
      search(this.props.search)
        .then(items => { this.setState({ items, loading: false, error: null }) })
        .catch(error => this.setState({ error, loading: false, items: [] }));
    }
  }
  public render() {
    return <p>{JSON.stringify(this.state)}</p>
  }
}

export default (withResearchContext)(ResearchQueryHandler);
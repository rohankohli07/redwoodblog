import type { ArticlesQuery, ArticlesQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  ArticlesQuery,
  ArticlesQueryVariables
> = gql`
  query ArticlesQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return (
    <ul>
      {articles.map((article) => (
        <Link
          style={{
            color: 'unset',
            padding: 16,
            margin: 8,
          }}
          key={article.id}
          to={routes.article({ id: article.id })}
        >
          <article>
            <header>
              <h2>{article.title}</h2>
            </header>
            <p>{article.body}</p>
            <div>Posted At: {new Date(article.createdAt).toUTCString()}</div>
          </article>
        </Link>
      ))}
    </ul>
  )
}

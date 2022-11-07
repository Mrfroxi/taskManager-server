export function PullRequestObj(
  title,
  login,
  type,
  comment,
  createAt,
  repositoryId,
  repositoryName,
  refTo,
  refWhere,
) {
  (this.repositoryId = repositoryId),
    (this.repositoryName = repositoryName),
    (this.title = title),
    (this.commentPullRequest = comment),
    (this.developer = login),
    (this.typeDeveloper = type),
    (this.createAt = createAt),
    (this.refTo = refTo),
    (this.refWhere = refWhere);
}

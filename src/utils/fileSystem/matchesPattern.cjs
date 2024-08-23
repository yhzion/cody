function matchesPattern(filePath, includePattern, excludePattern) {
  if (excludePattern && new RegExp(excludePattern).test(filePath)) {
    return false;
  }
  if (includePattern && !new RegExp(includePattern).test(filePath)) {
    return false;
  }
  return true;
}

module.exports = matchesPattern;

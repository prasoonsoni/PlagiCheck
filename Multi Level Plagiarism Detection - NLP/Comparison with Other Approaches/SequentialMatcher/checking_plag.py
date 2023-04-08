import difflib

# opening both the files in reading modes
with open("OriginalResearchPaper1.txt") as f1, open("ResearchPaper1.txt") as f2:
   
  # reading f1 contents
  content1 = f1.read()
   
  # reading f2 contents
  content2 = f2.read()

temp = difflib.SequenceMatcher(None,content1 ,content2)

print('Similarity Score: ',temp.ratio())
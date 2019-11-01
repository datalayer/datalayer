---
title: Natural Language Processing
---

# Natural Language Processing

This repository reviews useful tools to mine text, also infamously known as `Text Mining`.

## About Text Mining

Text mining and or natural language processing is a `huge` field. There are many topics covered amongst them we can find the followings:

+ Cleaning

 + Tokenizing
 + Sentence Segmentation a.k.a. Sentence Boundary Detection)
 + Part-of-Speech (POS) Tagging
 + Stemming (reduces the complexity without any severe loss of information, allows us to generate new bag of words, define new patterns)
 + Parsing
 + Stripping
 + Lower Casing (neutralize wrong typology, make word comparison easier)
 + Removal of stop words... (neutralize common words in a language that are not relevant in an analysis, neutralize common words in a field of activities)
 + Removal of punctuation, numbers, stop words... (neutralize wrong typology, make word comparison easier
 + Word Replacement
 + Chunker
 + Parser

+ Simple Analysis

 + Named Entity Extraction.
 + Chunking: Dividing a text in syntactically correlated parts of words.
 + Word count: Gives a list of n words and their frequencies in the corpus.
 + Spelling and Grammar Checker
 + Language Detection (refine analysis based on language specific features)
 + Clustering
 + Classifier
 + Frequent Terms: Similar to the word count, we do just specify a a minimum frequency for the output
 + Word Cloud: A word cloud is a visual representation for text data. It can quickly reveal the importance of each word trough colors and size.

+ Advanced Analysis

 + Key Phrase Extraction (Noun Phrase Extraction)
 + Topic extraction
 + Automatic Summarization
 + Mood & modality: Grammatical mood refers to the use of auxiliary verbs (e.g., could, would) and adverbs (e.g., definitely, maybe) to express uncertainty. 
 + Readability: Test the readability of a text. It returns a value between 0.0-1.0, based on Flesch Reading Ease, which measures word count and word length (= number of syllables per word).
 + Associations: Allow us to find the correlation between a corpus and a targeted word Source code.
 + Sentiment Analysis
 + Collocations
 + Coreference Resolution: Links multiple mentions of an entity in a document together
 + Thesaurus: Lists words grouped together according to similarity of meaning - Create a list of synonym related to the target words, a part of the typology issue can be handeled
 + Ontology
 + Lemmatization: Provide better (generalizable) lexical information that can be used by other components in the pipeline, and (possibly) also for indexing the processed text in a search engine. Lemmatization is not to be confused with stemming, in which frequent suffixes such as -ing and -ed are simply removed: having is stemmed to hav, while it is lemmatized to have.
 + Relation Finding
+  Prepositional Phrase Attachment

 + Base data is useful:
  + Key words: Key words is a necessary step in order to target the business case
  + List of synonyms: 
  + Words without vowels: Detect used abbreviation which can be change with the real word.

+ Language Specifics
 + Indefinite article
 + Pluralization + singularization
 + Comparative + superlative
 + Verb conjugation
 + Quantification
 + Spelling
 + n-grams
 + Parser
   + Tokenizer
   + Tagger
   + Chunker
 + Parse Trees
 + Sentiment
 + Mood & modality
 + WordNet
 + Wordlists

+ Metrics
 + Documentation
  + Profiler
  + Accuracy, precision and recall
  +  Inter-rater agreement (Fleiss)
 + Text metrics
  + Similarity (Levenshtein, Dice)
  + Readability (Flesch): test the readability of a text. It returns a value between 0.0-1.0, based on Flesch Reading Ease, which measures word count and word length (= number of syllables per word).
  + Type-token ratio
  + Intertextuality
  + Cooccurrence
 + Statistics
  + Mean, variance, standard deviation
  + Normal distribution
  + Histogram
  + Moment
  + Quantile & box plot
  + Fisher's exact test
  + Pearson's chi-squared test
  + Kolmogorov-Smirnov test

## Tools

An interesting slide on several open-source text mining tools available. [Here](http://www.cs.wayne.edu/~amarcus/ESEC.FSE.09.06.2011.Software.Tools.pdf).

In the following you will find details on a non-exhaustive list of available tools:

### [R-Project](http://www.r-project.org) (R)

The [Text Mining Infrastructure in R book](http://www.jstatsoft.org/v25/i05) summaries .

### [Gate](https://gate.ac.uk) (java)

+ Download Gate from https://gate.ac.uk/
+ Extract and run $GATE_HOME/bin/gate.sh
+ Check the installed plugins (Annie should be at least present)
+ Right-click the 'Applications' node in the tree, and select 'Ready Made Application > ANNIE > ANNIE'
+ Right-click the 'Language Resources' node in the tree, and select 'New > Gate Document'
+ Right-click the 'Language Resources' node in the tree, and select 'New > Gate Corpus'
+ Add there the 'edit' button (on the right), click the 'Add' button and add some Documents in the Corpus.
+ Double-click to the ANNIE node, on the bottom panel, select the Corpus.
+ Right-click the ANNIE node, select 'Run Application'
+ Double-click on the document of your choice, and see the 'Annotation Sets' (select on the top bar)

### [Weka](http://www.cs.waikato.ac.nz/ml/weka) (java)

Weka does not seem to support text as such. Will require preprocessing before we can use it as a tool for our goal. I currently see 3 packages available for text classification only: [DMNBtext](https:// http://weka.sourceforge.net/doc.packages/DMNBtext), [SparseGenerativeModel](http://sourceforge.net/projects/sgmweka/) and [bayesianLogisticRegression](https:// http://www.stat.rutgers.edu/~madigan/PAPERS/shortFat-v3a.pdf).

**note**: package manager is available since v3.7.2, so be sure to download the latest version (not the "stable" one).

+ Download Weka from http://www.cs.waikato.ac.nz/ml/weka/
+ Extract, cd $WEKA_HOME and run 'java -jar weka.jar'
+ Install via 'Tools > Package Manager'
+ Get the book 'Data Mining - Practical Machine Learning Tools and Techniques' and play

### Miscellaneous

[OpenNLP](https://opennlp.apache.org) (Java).

[JTopia](https://github.com/srijiths/jtopia).

POS

https://github.com/brendano/ark-tweet-nlp
https://gate.ac.uk/wiki/twitie.html

http://factorie.cs.umass.edu/
https://github.com/factorie/factorie

[NLPTK](http://www.nltk.org) (Python)

[Pattern](http://www.clips.ua.ac.be/pattern) (Python)

Includes many API access points (including Twitter, Facebook and Wikipedia) and many interesting text mining/analyses methods.

`pip install pattern` should be enough to be able to use the Python module. And then you should be able to run the following code:

```
from pattern.web import Twitter, plaintext
from pattern.en import parse, sentiment, ngrams, pprint
brand = "coca-cola"
twitter = Twitter(language='en')
for tweet in twitter.search(brand, cached=False, count=5):
    print plaintext(tweet.text)
    print sentiment(tweet.text)
```

[scikit-learn](http://scikit-learn.org) (Python)

Other Miscellaneous

+ [Lingpipe](http://alias-i.com/lingpipe)
+ [Tag Helper](http://www.cs.cmu.edu/~cprose/TagHelper.html)
+ [Apache Stanbol](https://stanbol.apache.org)
+ [Texcat Language Detection](http://textcat.sourceforge.net) Language guessing.
+ [Language Detection Java Library](https://code.google.com/p/language-detection)

## Distributed Text Mining

See.

+ http://markahall.blogspot.be/2013/10/weka-and-hadoop-part-1.html
+ http://wiki.pentaho.com/display/BAD/Weka+Execution+in+Hadoop
+ http://wiki.pentaho.com/display/BAD/Kettle+on+Spark
+ http://apache-spark-user-list.1001560.n3.nabble.com/Prediction-using-Classification-with-text-attributes-in-Apache-Spark-MLLib-td8166.html
+ http://spark-summit.org/2014/talk/text-analytics-on-spark
+ http://spark-summit.org/2014/talk/streamlining-search-indexing-using-elastic-search-and-spark

# 

This repository reviews useful tools to mine text, also infamously known as `Text Mining`.

Text mining and or natural language processing is a `huge` field and there are many topics covered.
Before using the tools, we need to understand what we are talking about...

# Vocabulary

+ Parser: provides functionality for tokenization and sentence splitting, part-of-speech tagging, chunking, relation finding, prepositional phrase attachment, lemmatization...
+ Tokenization: splits sentence periods and punctuation marks from words.
+ Stemming/Lemmatization: finds word stem/lemmata (e.g. was → be).
+ Tagging: assigns part-of-speech tags to words (e.g. cat → noun → NN, eat → verb → VB).
+ Chunking: assigns chunk tags to groups of words (e.g. the black cat → noun phrase → NP).
+ Relation finder: finds relations between chunks, sentence subject, object and predicates.
+ PNP finder: finds prepositional noun phrases (e.g. under the table).
+ PP-attachment: finds prepositional noun phrase anchors (e.g. eat pizza → with fork).
+ Collocations: Sequence of words or terms that co-occur more often than would be expected by chance - expression consisting of two or more words that correspond to some conventional way of saying things.
+ Coreference Resolution: Links multiple mentions of an entity in a document together.
+ Associations: Allow to find the correlation between a corpus and a targeted word.
+ Thesaurus: Lists words grouped together according to similarity of meaning - Create a list of synonym related to the target words, a part of the typology issue can be handeled
+ Ontology: provides theoretical basis and technical support for semantic information representation and organization.

# Grammar Basics

Sentences are made up of words. Words have a syntactic role (noun, verb, adjective, ...) depending on their location in the sentence. For example, can can be a verb or a noun, depending on the context (the can, I can).

+ Sentence: the basic unit of writing, expected to have a subject and a predicate.
+ Word: a string of characters that expresses a meaningful concept.
+ Token: a specific word with grammatical tags: the can/NN, I can/VB.
+ Chunk: a group of words (phrase) that contains a single thought (e.g. a sumptuous banquet).
+ Head: the word that determines the syntactic type of the chunk: the black cat → NP.
+ Subject: the person/thing doing or being, usually a noun phrase (NP): the cat is black.
+ Predicate: the remainder of the sentence tells us what the subject does: the cat sits on the mat.
+ Clause: subject + predicate.
+ Argument: a chunk that is related to a verb in a clause, i.e. subject and object.
+ Object: the person/thing affected by the action: the cat eats fish. Poor fish.
+ Preposition: temporal, spatial or logical relationship: the cat sits on the mat.
+ Copula: a word used to link subject and predicate, typically the verb to be.
+ Lemma: canonical form of a word: run, runs, running are part of a lexeme, run is the lemma.
+ POS: part-of-speech, the syntactic role that a word or phrase plays in a sentence, e.g. adjective = JJ.
+ Language specifics
 + Key words: Key words is a necessary step in order to target the business case.
 + List of synonyms
 + Abbreviations / Words without vowels: Detect used abbreviation which can be changed with the real word.
 + Indefinite article
 + Singularization + Pluralization
 + Comparative + Superlative
 + Verb conjugation
 + Quantification
 + Spelling
 + WordNet
 + Word lists

# Metrics
 + Documentation
  + Profiler
  + Accuracy, precision and recall
  + Inter-rater agreement (Fleiss)
 + Text metrics
  + Similarity (Levenshtein, Dice)
  + Readability (Flesch): test the readability of a text. It returns a value between 0.0-1.0, based on Flesch Reading Ease, which measures word count and word length (= number of syllables per word).
  + Type-token ratio
  + Intertextuality
  + Cooccurrence: Co-occurrence networks are generally used to provide a graphic visualization of potential relationships between people, organizations, concepts or other entities represented within written material. The generation and visualization of co-occurrence networks has become practical with the advent of electronically stored text amenable to text mining.
 + Statistics
  + Mean, variance, standard deviation
  + Normal distribution
  + Histogram
  + Moment
  + Quantile & Box-plot
  + Fisher's exact test
  + Pearson's chi-squared test
  + Kolmogorov-Smirnov test

# Processing: Text > Preparation > Exploration > Structure Analysis > Semantic Analysis > Meaning

+ Preparation (for later exploration, structure analysis, semantic analysis)
 + Tokenizing
  + Sentence Segmentation a.k.a. Sentence Boundary Detection
 + Stripping
  + Removal of stop words...: neutralize common words in a language that are not relevant in an analysis, neutralize common words in a field of activities
  + Removal of punctuation, numbers... (neutralize wrong typology, make word comparison easier)
 + Stemming / Lemmatization: reduces the complexity without any severe loss of information, allows us to generate new bag of words, define new patterns - Provide better (generalizable) lexical information that can be used by other components in the pipeline, and (possibly) also for indexing the processed text in a search engine. Lemmatization is not to be confused with stemming, in which frequent suffixes such as -ing and -ed are simply removed: having is stemmed to hav, while it is lemmatized to have.
  + For grammatical reasons, documents are going to use different forms of a word, such as organize, organizes, and organizing. Additionally, there are families of derivationally related words with similar meanings, such as democracy, democratic, and democratization. In many situations, it seems as if it would be useful for a search for one of these words to return documents that contain another word in the set.
    The goal of both stemming and lemmatization is to reduce inflectional forms and sometimes derivationally related forms of a word to a common base form. For instance:
      am, are, is $\Rightarrow$ be
      car, cars, car's, cars' $\Rightarrow$ car 
    The result of this mapping of text will be something like:
     the boy's cars are different colors $\Rightarrow$
     the boy car be differ color 
 + Spelling and Grammar Checker/Corrector
 + Lower Casing: Neutralize wrong typology, make word comparison easier
 + Word Replacement

+ Exploration (to have a view on the content, also to prepare for indexing/searching)
 + Language Detection: To refine analysis based on language specific features
 + Word count: Gives a list of words and their frequencies in the corpus. Use word cloud as visual representation for text data. It can quickly reveal the importance of each word trough colors and size.
 + Frequent Terms: Similar to the word count, we do just specify a a minimum frequency for the output
 + TF-IDF
 + n-grams (+ skip-grams):  In analyzing text documents, we can count the frequency of words appearing together in a fixed order. For example, we can count 2-word phrases like “baseball game”, “baseball card”, and “baseball player” etc. Similarly we can count 3-word phrase like “baseball game online”, “baseball game today”, and “baseball game reports”. This approach of counting all adjacent n words in a document is called n-gram approach. The 1-grams are all individual words in the documents, 2-grams are the adjacent 2-word phrases, and so on.
      For example, in the following sentence:
      A Major League Baseball game was held in Salt Lake City 40 years ago.
      1-grams are: {a, Major, League, Baseball, game, was, held, in, Salt, Lake, City, 40, years, ago}
      2-grams are: {a Major, Major League, League Baseball, Baseball game, game was, was held, held in, ... }
      3-grams are: {a Major League, Major League Baseball, League Baseball game, Baseball game was,...}
      Similarly we can count 4-grams, 5-grams and so on.  
 + Prepositional Phrase Attachment
 + Clustering
 + Classifier

+ Structure/Grammatical Analysis
 + Parse-tree and Natural Language Context-Free Grammars: A parse-tree represents the full syntactic structure of a segment of text, most often at the sentence level. It defined according to a specific context-free grammar.
 + Part-of-Speech (POS) Tagging: Part-of-Speech (POS) tagging consists in tagging each word in a sentence as a verb, noun, adjective, etc. This is also more expressively called word-category disambiguation. Indeed, some words exist only as noun or verbs, but others can fall in several classes. In the vast majority of cases, this ambiguity can be lifted using the context, i.e. the sentence in which it is used.
 + Chunking: Dividing a text in syntactically correlated parts of words - Also called shallow parsing, chunking is about detecting the main parts, or phrases of a sentence. In other words, it should detect the sentence form and intermediate levels noun phrase, verb phrase, etc. Figure ?? shows an example of chunks of a sentence. Chunks do not overlap

+ Semantic Analysis
 + Named Entity Extraction/Recognition (entity identification, entity chunking and entity extraction): Named Entity Recognition (NER) is a tagging elements of sentences which have a meaning outside their syntactic role in a sentence, named entities. We find in this category proper nouns (organization, persons, regions), but also number tags such as percentage, quantity, expressions of times, etc.
 + Semantic Role Labeling (SRL): Semantic role labeling, sometimes also called shallow semantic parsing, is a task in natural language processing consisting of the detection of the semantic arguments associated with the predicate or verb of a sentence and their classification into their specific roles. For example, given a sentence like "Mary sold the book to John", the task would be to recognize the verb "to sell" as representing the predicate, "Mary" as representing the seller (agent), "the book" as representing the goods (theme), and "John" as representing the recipient. This is an important step towards making sense of the meaning of a sentence. A semantic representation of this sort is at a higher-level of abstraction than a syntax tree. For instance, the sentence "The book was sold by Mary to John" has a different syntactic form, but the same semantic roles.

+ Meaning
 + Key/Noun Phrase Extraction
 + Topic extraction
 + Summarization
 + Sentiment
 + Mood & modality: Grammatical mood refers to the use of auxiliary verbs (e.g., could, would) and adverbs (e.g., definitely, maybe) to express uncertainty. 
 + Readability: Test the readability of a text. It returns a value between 0.0-1.0, based on Flesch Reading Ease, which measures word count and word length (= number of syllables per word).

# Text Mining Step-by-Step

+ Get `Initial_Dataset`
 + 
 
+ Explore `Initial_Dataset`
 + 1 note has many subnotes
 + How to split subnotes?
  + Find separators (visually + clustering)    >>>   STEP_TokenNotes

+ Tokenize Notes
 + With identified separators
 + Each subnote must be splitted in sentences

+ Create a `Source_Corpus` of sentences (being part of a subnote(date, client)

+ Detect Language
 + Add language feature to `Source_Corpus` and create a `I18N_Corpus`

+ Create `Simple_I18N_Corpus` for each `I18N_Corpus`
 + Remove Stop Words
 + Remove punctuation
 + Lower Case (neutralize wrong typology, make word comparison easier)
 + Stem (reduces the complexity without any severe loss of information)
 + Fix Typos

+ Explore `Simple_I18N_Corpus`
 + Identify abbreviations
 + Apply TF-IDF

+ Create `Cleaned_I18N_Corpus
 + Remove non-statically relevant rows (too small...)
 + Replace abbreviations from `Simple_I18N_Corpus`
 
+ Create `Features_Matrix`
 + Part 1
  + metrics based on our 4 bag-of-words
  + TF-IDF
  + word2vector
 + Part 2: grammar-based
  + Part-of-speech
  + NER
 + Part 3: Semantic base
  + SRL
 
+ Scale `Features_Matrix`
 
+ Flatten `Features_Matrix`
 
+ Create `Target_Matrix` (= Training Dataset)
 + Add to the `Features_Matrix` 3 columns
  + column with value = class1|class2|class3
  + column with tag1 = y|n
  + column with tag2 = y|n
 + This represents 12 classes (= 3 x 2 x 2)

!!! We may consider identifying intermediate classes for each client/date
 
+ Normalize `Target_Matrix`

+ Reduce the spare `Target_Matrix` dimension
 + PCA
 + What about multiple rows per client?

+ Learn a classification model
 + Choose a classification model algorithm (random forest...)
 + Learn classification model

# Pipeline

+ Rely on a pipeline solution to assemble and control the Steps
 + Pipeline reads the Dataset/Corpus to be used and produces the results

+ For each `Step`
 + Try use a Java or Scala libraries
  + Open-NLP
  + Standford-NLP
  + scala-NLP
  + Gate
 + Optionally, use R or Python
  + R (tm...)
  + Python (clips-pattern, nltk, scikit-learn)
 + Can be done on local disk, no need for Hadoop
 + Each step output will be persisted
 
+ Assemble and integrate each `Step` in the pipeline
 + Based on Hadoop/Hive/Spark, hence the need for Java/Scala bindings
 + Step result can be persisted or not on a case-by-case decision

# Tools

An interesting slide on several open-source text mining tools available. [Here](http://www.cs.wayne.edu/~amarcus/ESEC.FSE.09.06.2011.Software.Tools.pdf).

In the following you will find details on a non-exhaustive list of available tools:

## [OpenNLP](https://opennlp.apache.org) (Java)

+ OpenNLP

## [StanfordNLP](http://nlp.stanford.edu) (Java)

+ StandforNLP
+ http://nlp.stanford.edu:8080/corenlp/
+ http://universaldependencies.github.io/docs/

## [Chalk](https://github.com/scalanlp/chalk) (Scala)

+ scalanlp/chalk

## [R-Project](http://www.r-project.org) (R)

The [Text Mining Infrastructure in R book](http://www.jstatsoft.org/v25/i05) summaries .

## Libraries for Semantic Role Labeling (Java)

+ [Mate tools](http://code.google.com/p/mate-tools)
+ [SEMAFOR](http://www.ark.cs.cmu.edu/SEMAFOR) - the parser (MST) requires 8GB of RAM
+ [ClearNLP](https://code.google.com/p/clearnlp)

Other verticals:

+ Propbank-Nombank frames and The LTH System for Frame-Semantic Structure Extraction may be related to Mate tools
+ BioKIT - SRL for biomedical text

## [NLPTK](http://www.nltk.org) (Python)

+ NLTK is a platform for building Python programs to work with human language data.
+ It provides easy-to-use interfaces to over 50 corpora and lexical resources such as WordNet, along with a suite of text processing  libraries for classification, tokenization, stemming, tagging, parsing, and semantic reasoning.

## [Clips-Pattern](http://www.clips.ua.ac.be/pages/pattern) and [Clips-MBSP](http://www.clips.ua.ac.be/pages/MBSP) (Python)

Includes many API access points (including Twitter, Facebook and Wikipedia) and many interesting text mining/analyses methods.

## [scikit-learn](http://scikit-learn.org) (Python)

+ See http://scikit-learn.org/stable/modules/feature_extraction.html

## [Gate](https://gate.ac.uk) (Java)

+ Download Gate from https://gate.ac.uk/
+ Extract and run $GATE_HOME/bin/gate.sh
+ Check the installed plugins (Annie should be at least present)
+ Right-click the 'Applications' node in the tree, and select 'Ready Made Application > ANNIE > ANNIE'
+ Right-click the 'Language Resources' node in the tree, and select 'New > Gate Document'
+ Right-click the 'Language Resources' node in the tree, and select 'New > Gate Corpus'
+ Add there the 'edit' button (on the right), click the 'Add' button and add some Documents in the Corpus.
+ Double-click to the ANNIE node, on the bottom panel, select the Corpus.
+ Right-click the ANNIE node, select 'Run Application'
+ Double-click on the document of your choice, and see the 'Annotation Sets' (select on the top bar)

## Language Detection

+ [Tika Language Detection](http://tika.apache.org/1.4/detection.html) (Java)
+ [Texcat Language Detection](http://textcat.sourceforge.net) Language guessing  (Java)
+ [Language Detection Java Library](https://code.google.com/p/language-detection) (Java)

## [Weka](http://www.cs.waikato.ac.nz/ml/weka) (Java)

+ Weka does not seem to support text as such. Will require preprocessing before we can use it as a tool for our goal. I currently see 3 packages available for text classification only: [DMNBtext](https:// http://weka.sourceforge.net/doc.packages/DMNBtext), [SparseGenerativeModel](http://sourceforge.net/projects/sgmweka/) and [bayesianLogisticRegression](https:// http://www.stat.rutgers.edu/~madigan/PAPERS/shortFat-v3a.pdf).
+ **note**: package manager is available since v3.7.2, so be sure to download the latest version (not the "stable" one).
+ Download Weka from http://www.cs.waikato.ac.nz/ml/weka/
+ Extract, cd $WEKA_HOME and run 'java -jar weka.jar'
+ Install via 'Tools > Package Manager'
+ Get the book 'Data Mining - Practical Machine Learning Tools and Techniques' and play

## Other useful libraries

+ [word2vec](https://code.google.com/p/word2vec)
+ [Lingpipe](http://alias-i.com/lingpipe)
+ [Tag Helper](http://www.cs.cmu.edu/~cprose/TagHelper.html)
+ [Apache Stanbol](https://stanbol.apache.org)

## Distributed Text Mining

See following information related to distributed text mining:

+ http://spark.apache.org/docs/latest/mllib-feature-extraction.html
+ http://ampcamp.berkeley.edu/3/exercises/mli-document-categorization.html
+ http://apache-spark-user-list.1001560.n3.nabble.com/Prediction-using-Classification-with-text-attributes-in-Apache-Spark-MLLib-td8166.html
+ http://spark-summit.org/2014/talk/text-analytics-on-spark
+ http://spark-summit.org/2014/talk/streamlining-search-indexing-using-elastic-search-and-spark
+ http://markahall.blogspot.be/2013/10/weka-and-hadoop-part-1.html
+ http://wiki.pentaho.com/display/BAD/Weka+Execution+in+Hadoop
+ http://wiki.pentaho.com/display/BAD/Kettle+on+Spark

# Tools by Language

## Natural Language Processing in JAVA

+ CoreNLP - Stanford CoreNLP provides a set of natural language analysis tools which can take raw English language text input and give the base forms of words
+ Stanford Parser - A natural language parser is a program that works out the grammatical structure of sentences
+ Stanford POS Tagger - A Part-Of-Speech Tagger (POS Tagger
+ Stanford Name Entity Recognizer - Stanford NER is a Java implementation of a Named Entity Recognizer.
+ Stanford Word Segmenter - Tokenization of raw text is a standard pre-processing step for many NLP tasks.
+ Tregex, Tsurgeon and Semgrex - Tregex is a utility for matching patterns in trees, based on tree relationships and regular expression matches on nodes (the name is short for "tree regular expressions").
+ Stanford Phrasal: A Phrase-Based Translation System
+ Stanford English Tokenizer - Stanford Phrasal is a state-of-the-art statistical phrase-based machine translation system, written in Java.
+ Stanford Tokens Regex - A tokenizer divides text into a sequence of tokens, which roughly correspond to "words"
+ Stanford Temporal Tagger - SUTime is a library for recognizing and normalizing time expressions.
+ Stanford SPIED - Learning entities from unlabeled text starting with seed sets using patterns in an iterative fashion
+ Stanford Topic Modeling Toolbox - Topic modeling tools to social scientists and others who wish to perform analysis on datasets
+ Twitter Text Java - A Java implementation of Twitter's text processing library
+ MALLET - A Java-based package for statistical natural language processing, document classification, clustering, topic modeling, information extraction, and other machine learning applications to text.
+ OpenNLP - a machine learning based toolkit for the processing of natural language text.
+ LingPipe - A tool kit for processing text using computational linguistics.
+ ClearTK - ClearTK provides a framework for developing statistical natural language processing (NLP) components in Java and is built on top of Apache UIMA.
+ Apache cTAKES - Apache clinical Text Analysis and Knowledge Extraction System (cTAKES) is an open-source natural language processing system for information extraction from electronic medical record clinical free-text.

## Natural Language Processing in Scala

+ ScalaNLP - ScalaNLP is a suite of machine learning and numerical computing libraries.
+ Breeze - Breeze is a numerical processing library for Scala.
+ Chalk - Chalk is a natural language processing library.
+ FACTORIE - FACTORIE is a toolkit for deployable probabilistic modeling, implemented as a software library in Scala. It provides its users with a succinct language for creating relational factor graphs, estimating parameters and performing inference.

## Natural Language Processing in Python

+ NLTK - A leading platform for building Python programs to work with human language data.
+ Pattern - A web mining module for the Python programming language. It has tools for natural language processing, machine learning, among others.
+ Quepy - A python framework to transform natural language questions to queries in a database query language
+ TextBlob - Providing a consistent API for diving into common natural language processing (NLP) tasks. Stands on the giant shoulders of NLTK and Pattern, and plays nicely with both.
+ YAlign - A sentence aligner, a friendly tool for extracting parallel sentences from comparable corpora.
+ jieba - Chinese Words Segmentation Utilities.
+ SnowNLP - A library for processing Chinese text.
+ loso - Another Chinese segmentation library.
+ genius - A Chinese segment base on Conditional Random Field.
+ nut - Natural language Understanding Toolkit
+ Rosetta - Text processing tools and wrappers (e.g. Vowpal Wabbit)
+ BLLIP Parser - Python bindings for the BLLIP Natural Language Parser (also known as the Charniak-Johnson parser)

## Natural Language Processing in javascript

+ Twitter-text-js - A JavaScript implementation of Twitter's text processing library
+ NLP.js - NLP utilities in javascript and coffeescript
+ natural - General natural language facilities for node
+ Knwl.js - A Natural Language Processor in JS
+ Retext - Extensible system for analysing and manipulating natural language
+ TextProcessing - Sentiment analysis, stemming and lemmatization, part-of-speech tagging and chunking, phrase extraction and named entity recognition.

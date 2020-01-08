/**
 * Handles dataset for training purposes.
 *
 * Converts the dataset (json) to array.  
 * Splits the array to training set and testing set.
 *
 * @export
 * @class DataSetHandler
 */
export class DataSetHandler {
  /**
   * Creates an instance of DataSetHandler.
   * @param {Object} dataset
   * @memberof DataSetHandler
   */
  constructor(dataset) {
    // Extracting labels from the dataset
    this._labels = Object.keys(dataset[0]);
    // JSON to Dataset
    this.dataset = this.jsonToDataset(dataset);
    // this._datasetTrain stores 75% of the total dataset for training dataset
    this._datasetTrain = this.dataset;
    // this._datasetTest stores 25% of the total dataset for testing dataset
    this._datasetTest = [];
    // split datasets into Training and Testing datasets
    // comment following line to unsplit the dataset
    this.splittingDataSets();
  }

  /**
   * Converts JSON data to Array.
   *
   * @param {Object} dataset
   * @returns An array instance of dataset.
   * @memberof DataSetHandler
   */
  jsonToDataset(dataset) {
    let dtst = [];
    for (let i in dataset) {
      dtst.push(Object.values(dataset[i]));
    }
    return dtst;
  }

  /**
   * Spliting of dataset into training and testing dataset.
   *
   * @memberof DataSetHandler
   */
  splittingDataSets() {
    // lengthTest is 25% of the length of total dataset for testing dataset
    var lengthTest = Math.floor(0.25 * this.dataset.length);
    // randSamples stores random numbers from total dataset
    //      To Use random samples uncomment one of the following:
    //          1. Different random samples every time you run
    var randSamples = [];
    // Populating randSamples array with random numbers of from 0 to lengthTest (25% of total length of data)
    // for (var i = 0; randSamples.length < lengthTest; i++){
    //     var ele = Math.floor(Math.random() * (this.dataset.length - 1))
    //     if (!randSamples.includes(ele)){
    //         randSamples.push(ele);
    //     }
    // }
    //          2. Best accuracy samples, works only for heart disease dataset
    randSamples = [
      75,
      225,
      289,
      266,
      132,
      120,
      140,
      179,
      89,
      142,
      246,
      81,
      91,
      46,
      151,
      30,
      209,
      69,
      37,
      193,
      124,
      47,
      174,
      149,
      133,
      17,
      169,
      99,
      107,
      40,
      44,
      242,
      98,
      180,
      35,
      95,
      228,
      178,
      244,
      111,
      281,
      150,
      87,
      200,
      240,
      206,
      238,
      116,
      237,
      172,
      83,
      170,
      260,
      252,
      28,
      60,
      274,
      293,
      184,
      236,
      279,
      49,
      71,
      167,
      173,
      125,
      221,
      93,
      258,
      100,
      55,
      145,
      204,
      70,
      164
    ];

    this.datasetTrain = [];
    for (var i in this.dataset) {
      if (randSamples.includes(parseInt(i))) {
        this._datasetTest.push(this.dataset[i]);
      } else {
        this._datasetTrain.push(this.dataset[i]);
      }
    }
  }

  /**
   * Training DataSet getter
   *
   * @returns The training dataset.
   * @memberof DataSetHandler
   */
  getTrainingSet() {
    return this._datasetTrain;
  }

  /**
   * Testing DataSet getter
   *
   * @returns The testing dataset.
   * @memberof DataSetHandler
   */
  getTestingSet() {
    return this._datasetTest;
  }

  /**
   * Dataset labels getter
   *
   * @returns The labels of dataset.
   * @memberof DataSetHandler
   */
  getLabels() {
    return this._labels;
  }
}

/**
 * Naive Bayes Implementation class.
 *
 * In machine learning, Naive Bayes classifiers are a family of simple
 * "probabilistic classifiers" based on applying Bayes' theorem with strong
 * (naive) independence assumptions between the features.
 *
 * @export
 * @class NaiveBayes
 */
export class NaiveBayes {
  /**
   * Creates an instance of NaiveBayes.
   * 
   * @param {string[]} labels
   * @param {string[][]} datasetTrain
   * @param {string[][]} datasetTest
   * @memberof NaiveBayes
   */
  constructor(labels, datasetTrain, datasetTest) {
    this.datasetTrain = datasetTrain;
    this.datasetTest = datasetTest;
    this.labels = labels;
    // this.totalCount holds total number of rows in dataset
    this.totalCount = this.datasetTrain.length;
    // this.classValues stores distinct values of output class
    this.classValues = [];
    // this.classValueCount stores total count of distinct values of output class
    this.classValueCount = {};
    // this.priorProbability stores probability of distinct values of output class
    this.priorProbability = {};
    // this.likelihoodProbability stores probability of distinct values of each attribute
    this.likelihoodProbability = {};
    // this.attributeValueCount stores count of distinct values of each attribute
    this.attributeValueCount = {};
    // this.evidenceProbability stores probability of distinct values of each attribute
    this.evidenceProbability = {};
    // this.posteriorProbability
    this.posteriorProbability = [];
    // this.confusionMatrix stores Confusion Matrix
    this.confusionMatrix = {};
    // this.error returns error count
    this.error = 0;
    // this.accuracy returns percentage of accuracy
    this.accuracy = 0;
    // this.actualValues contains actual data output count for datasetTest
    this.actualValues = 0;
    this.evidence = 1;

    this.getMyObject = {};

    // Initializing this.attributeProbability to hold objects for distinct values of each attribute.
    for (var i in this.datasetTrain[0]) {
      if (i != this.datasetTrain[0].length - 1) {
        this.likelihoodProbability[this.labels[i]] = {};
      }
    }

    this.calculatePriorProbability();
    this.calculateLikelihoodProbability();
    this.calculateEvidenceProbability();
    this.evaluateModel();
  }

  /**
   * Calulate Prior Probability
   * 
   * It calcuates the prior probability required for calculation of posterior
   * probability. i.e calculates P(C)
   *
   * @memberof NaiveBayes
   */
  calculatePriorProbability() {
    var lastColumn = this.datasetTrain[0].length - 1;
    // Determining output class and its repetition count.
    for (var i in this.datasetTrain) {
      if (
        !this.priorProbability.hasOwnProperty(this.datasetTrain[i][lastColumn])
      ) {
        this.priorProbability[this.datasetTrain[i][lastColumn]] = 1;
      } else {
        this.priorProbability[this.datasetTrain[i][lastColumn]]++;
      }
    }
    // Getting classValues in order.
    this.classValues = Object.keys(this.priorProbability);
    // To get count of total distinct values of output class.
    for (var i in this.priorProbability) {
      this.classValueCount[i] = this.priorProbability[i];
    }
    // To get probability of total distinct values of output class.
    for (var i in this.priorProbability) {
      this.priorProbability[i] /= this.totalCount;
      // Rounding off probability: uncomment following
      this.priorProbability[i] =
        Math.round(this.priorProbability[i] * 10000) / 10000;
    }
  }

  /**
   * Calculate Likelihood Probability
   * 
   * It calculates the probability of distinct values of each attribute in
   * accordance to output.  
   * Required for calculation of posterior probability. i.e. P(X|C)
   *
   * @memberof NaiveBayes
   */
  calculateLikelihoodProbability() {
    var lastColumn = this.datasetTrain[0].length - 1;
    for (var i in this.datasetTrain) {
      for (var i2 in this.datasetTrain[i]) {
        if (i2 != lastColumn) {
          for (var i3 in this.classValues) {
            this.likelihoodProbability[this.labels[i2]][
              this.datasetTrain[i][i2]
            ] = [0];
          }
        }
      }
    }

    for (var i in this.datasetTrain) {
      for (var i2 in this.datasetTrain[i]) {
        if (i2 != lastColumn) {
          for (var i3 in this.classValues) {
            if (this.classValues[i3] == this.datasetTrain[i][lastColumn]) {
              if (
                !this.likelihoodProbability[this.labels[i2]][
                  this.datasetTrain[i][i2]
                ].hasOwnProperty(this.classValues[i3])
              ) {
                this.likelihoodProbability[this.labels[i2]][
                  this.datasetTrain[i][i2]
                ][this.classValues[i3]] = 1;
              } else {
                this.likelihoodProbability[this.labels[i2]][
                  this.datasetTrain[i][i2]
                ][this.classValues[i3]]++;
              }
            }
          }
        }
      }
    }

    for (var i in this.likelihoodProbability) {
      if (!this.attributeValueCount.hasOwnProperty(i)) {
        this.attributeValueCount[i] = {};
      }
    }

    for (var i in this.likelihoodProbability) {
      for (var i2 in this.likelihoodProbability[i]) {
        if (!this.attributeValueCount[i].hasOwnProperty(i2)) {
          this.attributeValueCount[i][i2] = this.likelihoodProbability[i][
            i2
          ].reduce((acc, ele) => {
            return acc + ele;
          }, 0);
        }
      }
    }

    for (var i in this.likelihoodProbability) {
      if (!this.getMyObject.hasOwnProperty(i)) {
        this.getMyObject[i] = {};
      }
    }
    for (var i in this.likelihoodProbability) {
      for (var i2 in this.likelihoodProbability[i]) {
        if (!this.getMyObject[i].hasOwnProperty(i2)) {
          this.getMyObject[i][i2] = Object.assign(
            {},
            this.likelihoodProbability[i][i2]
          );
        }
      }
    }

    for (var i in this.likelihoodProbability) {
      for (var i2 in this.likelihoodProbability[i]) {
        for (var i3 in this.likelihoodProbability[i][i2]) {
          this.likelihoodProbability[i][i2][i3] /= this.classValueCount[i3];
          this.likelihoodProbability[i][i2][i3] =
            Math.round(this.likelihoodProbability[i][i2][i3] * 10000) / 10000;
        }
      }
    }
  }

  /**
   * Calculate Evidence Probability
   * 
   * It calculates the probability of each attributes' distinct values
   * probability.  
   * Required for calculation of posterior probability. i.e. P(X)
   * 
   * @memberof NaiveBayes
   */
  calculateEvidenceProbability() {
    for (var i in this.attributeValueCount) {
      this.evidenceProbability[i] = {};
    }
    for (var i in this.attributeValueCount) {
      for (var i2 in this.attributeValueCount[i]) {
        this.evidenceProbability[i][i2] =
          this.attributeValueCount[i][i2] / this.totalCount;
      }
    }
  }

  /**
   * Calculate Posterior Probaility
   * 
   * Calculates the probability of argument 'inputArr' generating certain outcome,
   * then returns outcome. i.e. P(C|X)
   *
   * @param {number[]} inputArr
   * @memberof NaiveBayes
   */
  calculatePosteriorProbability(inputArr) {
    this.posteriorProbability = [];
    for (var i in this.classValues) {
      if (!this.posteriorProbability.hasOwnProperty(this.classValues[i])) {
        this.posteriorProbability[this.classValues[i]] = 1;
      }
    }

    var counter = 0;
    for (var i in this.likelihoodProbability) {
      if (i == this.labels[counter]) {
        for (var i2 in this.likelihoodProbability[i]) {
          if (i2 == inputArr[counter]) {
            for (var i3 in this.classValues) {
              if (
                this.likelihoodProbability[i][i2].hasOwnProperty(
                  this.classValues[i3]
                )
              ) {
                this.posteriorProbability[
                  this.classValues[i3]
                ] *= this.likelihoodProbability[i][i2][i3];
              }
            }
          }
        }
      }
      counter++;
    }

    for (const i in this.priorProbability) {
      if (this.priorProbability.hasOwnProperty(i)) {
        this.posteriorProbability[i] *= this.priorProbability[i];
      }
    }

    for (var i in this.posteriorProbability) {
      this.posteriorProbability[i] =
        Math.round(this.posteriorProbability[i] * 10000) / 10000;
    }
    var count = 0;
    for (var i in this.evidenceProbability) {
      for (var i2 in this.evidenceProbability[i]) {
        if (i2 == inputArr[count]) {
          this.evidence *= this.evidenceProbability[i][i2];
        }
      }
      count++;
    }

    for (var i in this.posteriorProbability) {
      this.posteriorProbability[i] =
        Math.round((this.posteriorProbability[i] / this.evidence) * 10000) /
        10000;
    }
  }

  /**
   * Classify the entity.
   * 
   * Classifies the Entity to certain group in one of the distinct class values.
   *
   * @returns
   * @memberof NaiveBayes
   */
  classify() {
    var temp = -99;
    for (var i in this.posteriorProbability) {
      temp =
        temp > this.posteriorProbability[i]
          ? temp
          : this.posteriorProbability[i];
    }
    return this.posteriorProbability.indexOf(temp);
  }

  /**
   * Evaluate Model
   * 
   * Evaluating naive bayes model using testing dataset.
   *
   * @memberof NaiveBayes
   */
  evaluateModel() {
    var expected_outcomes = [];
    var observed_outcomes = [];
    for (var i in this.datasetTest) {
      var temp = [];
      for (var i1 in this.datasetTest[i]) {
        if (i1 != this.datasetTest[i].length - 1) {
          temp.push(this.datasetTest[i][i1]);
        } else {
          expected_outcomes.push(this.datasetTest[i][i1]);
        }
      }
      this.calculatePosteriorProbability(temp);
      observed_outcomes.push(this.classify());
    }

    for (var i in this.classValues) {
      if (!this.confusionMatrix.hasOwnProperty(this.classValues[i])) {
        this.confusionMatrix[this.classValues[i]] = {};
      }
    }
    for (var ele in this.confusionMatrix) {
      for (var i in this.classValues) {
        if (!this.confusionMatrix[ele].hasOwnProperty(this.classValues[i])) {
          this.confusionMatrix[ele][this.classValues[i]] = 0;
        }
      }
    }

    for (var i = 0; i < this.datasetTest.length; i++) {
      this.confusionMatrix[expected_outcomes[i]][observed_outcomes[i]] += 1;
    }

    var error = 0;
    for (var i in this.confusionMatrix) {
      for (var j in this.confusionMatrix[i]) {
        if (i != j) {
          error += this.confusionMatrix[i][j];
        }
      }
    }

    var accuracy = (1 - error / this.datasetTest.length) * 100;

    this.accuracy = accuracy;
    this.error = error;
    // Counting values in test dataset
    var count = {};
    expected_outcomes.forEach(ele => (count[ele] = (count[ele] || 0) + 1));
    this.actualValues = count;
  }
}

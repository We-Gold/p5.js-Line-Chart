function LineChart(data, colors, lineLabels, w, h, x, y, xRange, yRange) {
  this.padding = 30
  this.data = data // [[]]
  this.colors = colors
  this.lineLabels = lineLabels
  this.w = w
  this.h = h
  this.chartW = w - this.padding
  this.chartH = h - this.padding
  this.x = x
  this.y = y
  this.chartX = this.padding
  this.chartY = this.padding
  this.xRange = xRange // [min, max]
  this.yRange = yRange // [min, max]
  this.hAxisLabelCount = 6
  this.vAxisLabelCount = 5
  this.xLine = map(yRange[0], yRange[0], yRange[1], this.chartH, this.chartY)
  this.yLine = map(xRange[0], xRange[0], xRange[1], this.chartX, this.chartW)

  this.show = () => {
    rectMode(CORNER)
    fill(255)
    push()
    translate(x, y)
    rect(0, 0, w, h)

    fill(0)
    stroke(0)
    strokeWeight(2)
    line(this.chartX, this.xLine, this.chartW, this.xLine)
    line(this.yLine, this.chartY, this.yLine, this.chartH)

    for (let i = 0; i < data.length; i++) {
      let prev = null;
      for (let j = 0; j < data[i].length; j++) {
        let x = map(data[i][j].x, this.xRange[0], this.xRange[1], this.chartX, this.chartX + this.chartW - this.padding)
        let y = (this.chartY + this.chartH) - map(data[i][j].y, this.yRange[0], this.yRange[1], this.chartY, this.chartY + this.chartH - this.padding)

        if (prev == null) {
          prev = createVector(x, y)
        } else {
          stroke(this.colors[i])
          line(prev.x, prev.y, x, y)
          fill(0)
          stroke(0)
          circle(prev.x, prev.y, 4)
          prev = createVector(x, y)
        }

        fill(0)
        stroke(0)
        circle(x, y, 4)
      }
    }

    // Draw the x axis labels
    for (let i = 0; i < this.hAxisLabelCount; i++) {
      let label = map(i, 0, this.hAxisLabelCount - 1, this.xRange[0], this.xRange[1])
      strokeWeight(0)
      textAlign(CENTER)
      textSize(10)
      fill(0)
      let x = map(label, this.xRange[0], this.xRange[1], this.chartX, this.chartX + this.chartW - this.padding)
      text(round(label) + "", x, this.xLine + (this.padding * 0.7))
      strokeWeight(2)
      line(x, this.xLine + 3, x, this.xLine - 3)
    }

    // Draw the y axis labels
    for (let i = 0; i < this.vAxisLabelCount; i++) {
      let label = map(i, 0, this.vAxisLabelCount - 1, this.yRange[0], this.yRange[1])
      strokeWeight(0)
      textAlign(RIGHT, CENTER)
      textSize(10)
      fill(0)
      let y = (this.chartY + this.chartH) - map(label, this.yRange[0], this.yRange[1], this.chartY, this.chartY + this.chartH - this.padding)
      text(round(label) + "", this.yLine - (this.padding * 0.25), y)
      strokeWeight(2)
      line(this.yLine + 3, y, this.yLine - 3, y)
    }

    strokeWeight(0)
    textAlign(LEFT, BOTTOM)
    textSize(12)
    
    let totalWidth = 0
    
    let textPadding = 10
    
    for (let i = 0; i < this.lineLabels.length; i++) {
      totalWidth += textWidth(this.lineLabels[i]) + textPadding
      
      if(i + 1 == this.lineLabels.length) {
        totalWidth -= textPadding
      }
    }
    
    let startX = this.chartX + (this.chartW - this.padding - totalWidth)/2 
        
    // Draw the line labels
    for (let i = 0; i < this.lineLabels.length; i++) {
      fill(this.colors[i])
      let prevLen = 0
      if (i > 0) {
        prevLen = textWidth(this.lineLabels[i - 1]) + textPadding
      }
      text(this.lineLabels[i], startX + prevLen, this.chartY - 3)
    }
    pop()
  }
}
import React from "react";
import { Map } from 'react-amap';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

import $ from "jquery";

class Drilldown extends React.Component {
  render() {
    const { Text } = Guide;
   /* $("#mountNode").html(
      '<div style="position: relative;">' +
        '<div id="china" style="width: 50%;height:400px;position: absolute;left: 0;top: 0;"></div>' +
        '<div id="province" style="width: 50%;height:400px;position: absolute;right: 0;top: 0;"></div>' +
        "</div>"
    ); */// 调用高德 api 绘制底图以及获取 geo 数据

    const map = new AMap.Map("china", {
      zoom: 4
    });
    const colors = [
      "#3366cc",
      "#dc3912",
      "#ff9900",
      "#109618",
      "#990099",
      "#0099c6",
      "#dd4477",
      "#66aa00",
      "#b82e2e",
      "#316395",
      "#994499",
      "#22aa99",
      "#aaaa11",
      "#6633cc",
      "#e67300",
      "#8b0707",
      "#651067",
      "#329262",
      "#5574a6",
      "#3b3eac"
    ]; // 当前聚焦的区域

    let currentAreaNode;

    function processData(geoJSON) {
      const mapData = {
        type: "FeatureCollection",
        features: geoJSON
      }; // 构造虚拟数据

      const userData = [];

      for (let i = 0; i < geoJSON.length; i++) {
        const name = geoJSON[i].properties.name;
        userData.push({
          name: name,
          value: Math.round(Math.random() * 1000)
        });
      }

      const ds = new DataSet();
      const geoDataView = ds.createView().source(mapData, {
        type: "GeoJSON"
      }); // geoJSON 经纬度数据
      // 用户数据

      const dvData = ds.createView().source(userData);
      dvData.transform({
        type: "geo.region",
        field: "name",
        geoDataView: geoDataView,
        as: ["longitude", "lantitude"]
      });
      return dvData;
    }

    class App extends React.Component {
      constructor() {
        super();
        this.state = {
          width: 200,
          height: 200,
          name: "",
          dv: ""
        };
        this.renderG2Map = this.renderG2Map.bind(this);
      }

      componentDidMount() {
        const _this = this;

        AMapUI.load(["ui/geo/DistrictExplorer", "lib/$"], function(
          DistrictExplorer
        ) {
          // 创建一个实例
          const districtExplorer = (window.districtExplorer = new DistrictExplorer(
            {
              eventSupport: true,
              //打开事件支持
              map: map
            }
          )); // feature被点击

          districtExplorer.on("featureClick", function(e, feature) {
            var props = feature.properties; //如果存在子节点

            if (props.childrenNum > 0) {
              //切换聚焦区域
              switch2AreaNode(props.adcode);
            }
          }); //外部区域被点击

          /*districtExplorer.on("outsideClick", function(e) {
            districtExplorer.locatePosition(
              e.originalEvent.lnglat,
              function(error, routeFeatures) {
                if (routeFeatures && routeFeatures.length > 1) {
                  //切换到省级区域
                  switch2AreaNode(routeFeatures[1].properties.adcode);
                } else {
                  //切换到全国
                  switch2AreaNode(100000);
                }
              },
              {
                evelLimit: 2
              }
            );
          }); *///绘制某个区域的边界

          function renderAreaPolygons(areaNode) {
            var node = _.cloneDeep(areaNode);

            districtExplorer.clearFeaturePolygons();
            districtExplorer.renderSubFeatures(node, function(feature, i) {
              var fillColor = colors[i % colors.length];
              var strokeColor = colors[colors.length - 1 - (i % colors.length)];
              return {
                cursor: "default",
                bubble: true,
                strokeColor: strokeColor,
                //线颜色
                strokeOpacity: 1,
                //线透明度
                strokeWeight: 1,
                //线宽
                fillColor: fillColor,
                //填充色
                fillOpacity: 0.35 //填充透明度
              };
            }); //绘制父区域

            districtExplorer.renderParentFeature(node, {
              cursor: "default",
              bubble: true,
              strokeColor: "black",
              //线颜色
              strokeOpacity: 1,
              //线透明度
              strokeWeight: 1,
              //线宽
              fillColor: null,
              //填充色
              fillOpacity: 0.35 //填充透明度
            });
          } //切换区域后刷新显示内容

          function refreshAreaNode(areaNode) {
            districtExplorer.setHoverFeature(null);
            renderAreaPolygons(areaNode);
          } //切换区域

          function switch2AreaNode(adcode, callback) {
            if (
              currentAreaNode &&
              "" + currentAreaNode.getAdcode() === "" + adcode
            ) {
              return;
            }

            loadAreaNode(adcode, function(error, areaNode) {
              if (error) {
                if (callback) {
                  callback(error);
                }

                return;
              }

              currentAreaNode = window.currentAreaNode = areaNode;
              refreshAreaNode(areaNode);

              if (callback) {
                callback(null, areaNode);
              }
            });
          } //加载区域

          function loadAreaNode(adcode, callback) {
            districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
              if (error) {
                if (callback) {
                  callback(error);
                }

                return;
              }

              _this.renderG2Map(areaNode); // 使用 G2 绘制地图

              if (callback) {
                callback(null, areaNode);
              }
            });
          } // 浙江

          switch2AreaNode(110000);
        });
      } // 开始使用 G2 绘制地图

      renderG2Map(areaNode) {
        const adcode = areaNode.getAdcode();
        const geoJSON = areaNode.getSubFeatures(); // 获取 geoJSON 数据

        const name = areaNode.getName();

        if (
          !geoJSON ||
          (currentAreaNode && "" + currentAreaNode.getAdcode() === "" + adcode)
        ) {
          return;
        }

        const dv = processData(geoJSON); // start: 计算地图的最佳宽高

        const longitudeRange = dv.range("longitude");
        const lantitudeRange = dv.range("lantitude");
        const ratio =
          (longitudeRange[1] - longitudeRange[0]) /
          (lantitudeRange[1] - lantitudeRange[0]);
        let width;
        let height;

        if (ratio > 1) {
          width = 500;
          height = width / ratio;
        } else {
          width = 300 * ratio;
          height = 500;
        } // end: 计算地图的最佳宽高

        this.setState({
          width,
          height,
          name,
          dv
        });
      }

      render() {
        const { height, width, name, dv } = this.state;
        return (
          <Chart height={height} width={width} data={dv} padding={0}>
            <Tooltip showTitle={false} />
            <Geom
              type="polygon"
              position="longitude*lantitude"
              select={{
                // 设置是否允许选中以及选中样式
                mode: "single",
                // 多选还是单选
                style: {
                  fill: "#1890ff" // 选中的样式
                }
              }}
              tooltip="name"
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
              color={["value", "#BAE7FF-#1890FF-#0050B3"]}
            >
              <Label
                content="name"
                textStyle={{
                  fill: "#fff",
                  fontSize: 10,
                  shadowBlur: 2,
                  shadowColor: "rgba(0, 0, 0, .45)"
                }}
              />
            </Geom>
            <Guide>
              <Text
                offsetY={20}
                content={name}
                position={["min", "max"]}
                style={{
                  fontSize: 14,
                  fontWeight: "bold"
                }}
              />
            </Guide>
          </Chart>
        );
      }
    }
    return (
      <div>
        <App />
      </div>
    );
  }
}

export default Drilldown;
package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.IMicrowaveDao;
import com.leverx.leverxspringdemo.domain.Microwave;
import com.leverx.leverxspringdemo.domain.Services;

@Repository
public class MicrowaveDao implements IMicrowaveDao {

	private static final Logger logger = LoggerFactory.getLogger(MicrowaveDao.class);

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Microwave> getById(String id) {
		Optional<Microwave> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 \"microid\", \"brand\" FROM \"HiMTA::Microwave\" WHERE \"microid\" = ?")) {
			stmnt.setString(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Microwave microwave = new Microwave();
				microwave.setMicroid(id);
				microwave.setBrand(result.getString("brand"));
				entity = Optional.of(microwave);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}
	public Microwave getServices(String id) throws SQLException {

		Connection conn = dataSource.getConnection();
		PreparedStatement stmnt = conn.prepareStatement("SELECT TOP 1 \"microid\", \"brand\" FROM \"HiMTA::Microwave\" WHERE \"microid\" = ?");
		stmnt.setString(1, id);
			ResultSet result = stmnt.executeQuery();
			Microwave microwave = new Microwave();
			if (result.next()) {
				microwave.setMicroid(id);
				microwave.setBrand(result.getString("brand"));
				
			}

		List<Services> servList = new ArrayList<Services>();

			PreparedStatement stmnt2 = conn.prepareStatement("SELECT \"servid\", \"microid\", \"address\" FROM \"HiMTA::ExtraInfo.Services\" WHERE \"servid\" = ? ");
			stmnt2.setString(1, id);
			ResultSet result2 = stmnt2.executeQuery();
			while (result2.next()) {
				Services services = new Services();
				services.setServid(result2.getString("servid"));
				services.setMicroid(result2.getString("microid"));
				services.setAddress(result2.getString("address"));
				servList.add(services);
			}
			microwave.servList = servList;
			conn.close();
		return microwave;
	}

	@Override
	public List<Microwave> getAll() {
		List<Microwave> microwaveList = new ArrayList<Microwave>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT \"microid\", \"brand\" FROM \"HiMTA::Microwave\"")) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Microwave microwave = new Microwave();
				microwave.setMicroid(result.getString("microid"));
				microwave.setBrand(result.getString("brand"));
				microwaveList.add(microwave);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return microwaveList;
	}

	@Override
	public void save(Microwave entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO \"HiMTA::Microwave\"(\"brand\") VALUES (?)")) {
			stmnt.setString(1, entity.getBrand());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(String id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"HiMTA::Microwave\" WHERE \"microid\" = ?")) {
			stmnt.setString(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Microwave entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE \"HiMTA::Microwave\" SET \"brand\" = ? WHERE \"microid\" = ?")) {
			stmnt.setString(1, entity.getBrand());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

}